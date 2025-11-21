CREATE TABLE "links" (
	"code" varchar(8) PRIMARY KEY NOT NULL,
	"url" varchar(2048) NOT NULL,
	"clicks" integer DEFAULT 0,
	"last_clicked" timestamp,
	"created_at" timestamp DEFAULT now()
);
