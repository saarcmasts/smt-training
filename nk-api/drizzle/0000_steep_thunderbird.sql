CREATE TABLE "auth" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"loginId" varchar NOT NULL,
	"password" varchar NOT NULL,
	"lastLogin" timestamp DEFAULT now(),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
