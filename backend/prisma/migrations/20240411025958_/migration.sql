-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contact` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `birthdate` VARCHAR(191) NOT NULL,
    `years_experience` VARCHAR(191) NOT NULL,
    `datetime_created` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_contact_key`(`contact`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_title` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `employment_type` ENUM('PART_TIME', 'FULL_TIME') NULL,
    `penv` ENUM('ONSITE', 'WFH') NULL,
    `level_expertise` ENUM('BEGINNER', 'JUNIOR', 'SENIOR') NULL,
    `job_desc` VARCHAR(1000) NOT NULL,
    `job_quali` VARCHAR(1000) NOT NULL,
    `job_responsb` VARCHAR(1000) NOT NULL,
    `benefits` VARCHAR(1000) NOT NULL,
    `salary` DOUBLE NOT NULL,
    `datetime_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `datetime_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('PENDING', 'REJECTED', 'COMPLETED') NULL,
    `type_interview` ENUM('INITIAL_INTERVIEW', 'FINAL_INTERVIEW', 'SUBMISSION_DOCUMENTS') NULL,
    `initial_done_date` VARCHAR(191) NULL,
    `final_done_date` VARCHAR(191) NULL,
    `final_requirements_done_date` VARCHAR(191) NULL,
    `intial_stars` INTEGER NULL,
    `final_stars` INTEGER NULL,
    `intitial_message` VARCHAR(500) NULL,
    `final_message` VARCHAR(500) NULL,
    `datetime_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `job_listingId` INTEGER NOT NULL,

    INDEX `application_job_listingId_idx`(`job_listingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `interviewer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `datetime_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `interviewer_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
