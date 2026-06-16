CREATE TABLE "subscribers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"source" text DEFAULT 'unknown' NOT NULL,
	"consent" boolean DEFAULT false NOT NULL,
	"attribution" jsonb,
	"user_id" text,
	"signup_count" text DEFAULT '1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "subscribers_source_idx" ON "subscribers" USING btree ("source");