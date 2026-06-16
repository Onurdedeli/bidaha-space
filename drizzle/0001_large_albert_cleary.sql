CREATE TABLE "drops" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"artist" text NOT NULL,
	"context" text DEFAULT '' NOT NULL,
	"emoji" text DEFAULT '🎵' NOT NULL,
	"ends_at" timestamp with time zone NOT NULL,
	"href" text DEFAULT '/anlar' NOT NULL,
	"kind" text DEFAULT 'ozel' NOT NULL,
	"total" integer DEFAULT 100 NOT NULL,
	"claimed" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"artist_slug" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"item_id" text NOT NULL,
	"item_type" text NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"artist" text NOT NULL,
	"unit_price" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"options" jsonb,
	"note" text
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"email" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"subtotal" integer NOT NULL,
	"shipping" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"currency" text DEFAULT 'TRY' NOT NULL,
	"attribution" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "follows_user_artist_idx" ON "follows" USING btree ("user_id","artist_slug");--> statement-breakpoint
CREATE INDEX "orders_user_idx" ON "orders" USING btree ("user_id");