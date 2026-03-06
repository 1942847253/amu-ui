CREATE TABLE `departments` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `parentId` VARCHAR(64) NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `departments_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `permissions` (
  `code` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `module` VARCHAR(64) NOT NULL,
  `apiScopes` JSON NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `roles` (
  `id` VARCHAR(64) NOT NULL,
  `code` VARCHAR(128) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `dataScope` ENUM('ALL', 'DEPARTMENT', 'DEPARTMENT_AND_CHILDREN', 'SELF', 'CUSTOM') NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `roles_code_key`(`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` VARCHAR(64) NOT NULL,
  `username` VARCHAR(64) NOT NULL,
  `displayName` VARCHAR(128) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `departmentId` VARCHAR(64) NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `status` ENUM('ACTIVE', 'LOCKED') NOT NULL,
  `passwordHash` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `users_username_key`(`username`),
  UNIQUE INDEX `users_email_key`(`email`),
  CONSTRAINT `users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `user_roles` (
  `userId` VARCHAR(64) NOT NULL,
  `roleId` VARCHAR(64) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`, `roleId`),
  CONSTRAINT `user_roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `role_permissions` (
  `roleId` VARCHAR(64) NOT NULL,
  `permissionCode` VARCHAR(128) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`roleId`, `permissionCode`),
  CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_permissions_permissionCode_fkey` FOREIGN KEY (`permissionCode`) REFERENCES `permissions`(`code`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `user_direct_permissions` (
  `userId` VARCHAR(64) NOT NULL,
  `permissionCode` VARCHAR(128) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`, `permissionCode`),
  CONSTRAINT `user_direct_permissions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_direct_permissions_permissionCode_fkey` FOREIGN KEY (`permissionCode`) REFERENCES `permissions`(`code`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `menus` (
  `id` VARCHAR(64) NOT NULL,
  `key` VARCHAR(191) NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `icon` VARCHAR(128) NOT NULL,
  `permissionCodes` JSON NULL,
  `parentId` VARCHAR(64) NULL,
  `sortOrder` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `menus_key_key`(`key`),
  CONSTRAINT `menus_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `menus`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `audit_logs` (
  `id` VARCHAR(64) NOT NULL,
  `operator` VARCHAR(64) NOT NULL,
  `action` VARCHAR(255) NOT NULL,
  `resource` VARCHAR(255) NOT NULL,
  `result` VARCHAR(32) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `auth_sessions` (
  `id` VARCHAR(64) NOT NULL,
  `userId` VARCHAR(64) NOT NULL,
  `refreshTokenId` VARCHAR(64) NOT NULL,
  `expiresAt` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `auth_sessions_userId_idx`(`userId`),
  CONSTRAINT `auth_sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
