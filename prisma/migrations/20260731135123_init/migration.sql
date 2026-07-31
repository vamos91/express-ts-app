-- CreateTable
CREATE TABLE `playlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `description` TEXT NOT NULL,
    `is_public` BOOLEAN NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    INDEX `playlist_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `playlist_has_track` (
    `playlist_id` INTEGER NOT NULL,
    `track_id` INTEGER NOT NULL,

    INDEX `playlist_has_track_playlist_id_foreign`(`playlist_id`),
    INDEX `playlist_has_track_track_id_foreign`(`track_id`),
    PRIMARY KEY (`playlist_id`, `track_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `track` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL,
    `duration` INTEGER NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('basic', 'premium', 'admin') NOT NULL,
    `isValidated` BOOLEAN NOT NULL,
    `created_at` DATE NOT NULL,
    `updated_at` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `playlist` ADD CONSTRAINT `playlist_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `playlist_has_track` ADD CONSTRAINT `playlist_has_track_playlist_id_foreign` FOREIGN KEY (`playlist_id`) REFERENCES `playlist`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `playlist_has_track` ADD CONSTRAINT `playlist_has_track_track_id_foreign` FOREIGN KEY (`track_id`) REFERENCES `track`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
