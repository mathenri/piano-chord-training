package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var mongoClient *mongo.Client

type Stats struct {
	ChordName                  string    `json:"chord_name" bson:"chord_name"`
	RootNote                   string    `json:"root_note" bson:"root_note"`
	ChordExtension             string    `json:"chord_extension" bson:"chord_extension"`
	AnswerDurationMilliSeconds int       `json:"answer_duration_millis" bson:"answer_duration_millis"`
	CreatedAt                  time.Time `json:"created_at" bson:"created_at"`
}

func main() {
	// connect to mongo
	mongoClient = connectToMongo("mongodb://mongo:27017")
	defer mongoClient.Disconnect(context.Background())

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(60 * time.Second))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: false,
		MaxAge:           300,
	}))

	r.Get("/stats", addStatsHandler)
	r.Post("/stats", addStatsHandler)
	http.ListenAndServe(":8080", r)

}

// UpdatePost updates settings
func addStatsHandler(w http.ResponseWriter, r *http.Request) {
	var stats Stats
	json.NewDecoder(r.Body).Decode(&stats)

	_, err := mongoClient.Database("main").Collection("statistics").InsertOne(
		context.Background(),
		stats,
	)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	} else {
		w.WriteHeader(http.StatusOK)
	}
}

func connectToMongo(url string) *mongo.Client {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(url))
	if err != nil {
		log.Fatalln("Failed to connect to Mongo! Error:", err)
	}
	err = client.Ping(context.Background(), readpref.Primary())
	if err != nil {
		log.Fatalln("Failed to ping Mongo! Error:", err)
	}
	return client
}
