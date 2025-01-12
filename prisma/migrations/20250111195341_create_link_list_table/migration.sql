-- CreateTable
CREATE TABLE `LinkList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalLink` VARCHAR(191) NOT NULL,
    `shortLinkCode` VARCHAR(191) NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `LinkList_shortLinkCode_key`(`shortLinkCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
