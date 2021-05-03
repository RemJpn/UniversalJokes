# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_03_134203) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "jokes", force: :cascade do |t|
    t.text "content"
    t.bigint "user_id", null: false
    t.bigint "language_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_jokes_on_category_id"
    t.index ["language_id"], name: "index_jokes_on_language_id"
    t.index ["user_id"], name: "index_jokes_on_user_id"
  end

  create_table "languages", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "liked_jokes", force: :cascade do |t|
    t.bigint "joke_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["joke_id"], name: "index_liked_jokes_on_joke_id"
    t.index ["user_id"], name: "index_liked_jokes_on_user_id"
  end

  create_table "saved_jokes", force: :cascade do |t|
    t.bigint "joke_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["joke_id"], name: "index_saved_jokes_on_joke_id"
    t.index ["user_id"], name: "index_saved_jokes_on_user_id"
  end

  create_table "translations", force: :cascade do |t|
    t.text "content"
    t.bigint "joke_id", null: false
    t.bigint "language_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["joke_id"], name: "index_translations_on_joke_id"
    t.index ["language_id"], name: "index_translations_on_language_id"
    t.index ["user_id"], name: "index_translations_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "nickname"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "jokes", "categories"
  add_foreign_key "jokes", "languages"
  add_foreign_key "jokes", "users"
  add_foreign_key "liked_jokes", "jokes"
  add_foreign_key "liked_jokes", "users"
  add_foreign_key "saved_jokes", "jokes"
  add_foreign_key "saved_jokes", "users"
  add_foreign_key "translations", "jokes"
  add_foreign_key "translations", "languages"
  add_foreign_key "translations", "users"
end
