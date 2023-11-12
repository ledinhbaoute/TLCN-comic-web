CREATE DATABASE  IF NOT EXISTS `comicbooks_reading`;
USE `comicbooks_reading`;

-- drop database `comicbooks_reading`
	
CREATE TABLE `genres` (
  `id` varchar(20) NOT NULL,
  `name` nvarchar(128) NOT NULL unique,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `genres` WRITE;
ALTER TABLE `genres` DISABLE KEYS ;
ALTER TABLE `genres` ENABLE KEYS ;
UNLOCK TABLES;

create table `users`(
	`id` varchar(20) not null,
    `name` nvarchar(128) not null,
    `avatar` varchar(200) default null,
    `isPremium` tinyint(1) default 0,
    `email` varchar(128) not null,
    `phone_number` varchar(20) not null,
    `user_name` varchar(128) not null,
    `password` varchar(20) not null,
    `balance` int unsigned default 0,
    `bank_account` varchar(20) default null,
	`bank_name` varchar(20) default null,
    `status` int default 1 check (`status`>=1 and `status`<=2),
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
ALTER TABLE `users` DISABLE KEYS ;
ALTER TABLE `users` ENABLE KEYS ;
UNLOCK TABLES;


CREATE TABLE `comicbooks` (
  `id` varchar(20) NOT NULL,
  `name` nvarchar(128) NOT NULL,
  `isPremium` tinyint(1) default 0,
  `actor_id` varchar(20) NOT NULL,
  `view` int unsigned NOT NULL default 0,
  `rate` decimal(2,1) NOT NULL,
  `publish_date` date NOT NULL, 
  `update_date` date NOT NULL,
  `status` int default 2 check (`status`>=1 and `status`<=3) ,

  PRIMARY KEY (`id`),
  constraint `fk_comicbooks_users` foreign key (`actor_id`) references `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comicbooks` WRITE;
ALTER TABLE `comicbooks` DISABLE KEYS ;
ALTER TABLE `comicbooks` ENABLE KEYS ;
UNLOCK TABLES;

create table `comicbooks_genres`(
  `genre_id` varchar(20) NOT NULL,
  `comicbook_id` varchar(20) NOT NULL,
  primary key(`genre_id`, `comicbook_id`),
  CONSTRAINT `fk_comicbooks_genres` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`),
  constraint `fk_comicbooks_comic` foreign key (`comicbook_id`) references `comicbooks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comicbooks_genres` WRITE;
ALTER TABLE `comicbooks_genres` DISABLE KEYS ;
ALTER TABLE `comicbooks_genres` ENABLE KEYS ;
UNLOCK TABLES;


create table `admin`(
	`id` int unsigned auto_increment not null,
    `name` nvarchar(128) not null,
    `email` varchar(128) not null,
    `phone_number` varchar(20) not null,
    `user_name` varchar(128) not null,
    `password` varchar(20) not null,
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `admin` WRITE;
ALTER TABLE `admin` DISABLE KEYS ;
ALTER TABLE `admin` ENABLE KEYS ;
UNLOCK TABLES;

create table `system_bank_account`(
	`bank_account` varchar(20) not null,
	`bank_name` varchar(20) not null,
    primary key (`bank_account`, `bank_name`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `system_bank_account` WRITE;
ALTER TABLE `system_bank_account` DISABLE KEYS ;
ALTER TABLE `system_bank_account` ENABLE KEYS ;
UNLOCK TABLES;


create table `chapters`(
	`id` varchar(20) not null,
    `chapter_name` nvarchar(128) not null,
    `comicbook_id` varchar(20) not null,
    `publish_date` date not null,
    `ordinal_number` int unsigned not null,
    primary key (`id`),
    CONSTRAINT `fk_chapters_comicbooks` FOREIGN KEY (`comicbook_id`) REFERENCES `comicbooks` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `chapters` WRITE;
ALTER TABLE `chapters` DISABLE KEYS ;
ALTER TABLE `chapters` ENABLE KEYS ;
UNLOCK TABLES;

create table `ratings`(
	
    `user_id` varchar(20) not null,
    `comic_id` varchar(20) not null,
    `score` int unsigned not null,
    `comment` varchar(100) default null,
    primary key (`user_id`,`comic_id`),
    constraint `fk_ratings_users` foreign key (`user_id`) references `users` (`id`),
	constraint `fk_ratings_comics` foreign key (`comic_id`) references `comicbooks` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `ratings` WRITE;
ALTER TABLE `ratings` DISABLE KEYS ;
ALTER TABLE `ratings` ENABLE KEYS ;
UNLOCK TABLES;

create table `comments`(
	`id` int unsigned auto_increment not null,
	`user_id` varchar(20) not null,
    `chapter_id` varchar(20) not null,
    `created_at` timestamp(6) not null default current_timestamp(6),
    `content` text not null,
    primary key (`id`),
    constraint `fk_comments_users` foreign key (`user_id`) references `users` (`id`),
    constraint `fk_comments_chapters` foreign key (`chapter_id`) references `chapters` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comments` WRITE;
ALTER TABLE `comments` DISABLE KEYS ;
ALTER TABLE `comments` ENABLE KEYS ;
UNLOCK TABLES;


create table `images`(
	`id` int unsigned auto_increment not null,
    `chapter_id` varchar(20) not null,
    `link` varchar(200) not null,
    `ordinal_number` int unsigned not null,
    primary key(`id`),
    constraint `fk_images_chapters` foreign key (`chapter_id`) references `chapters` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `images` WRITE;
ALTER TABLE `images` DISABLE KEYS ;
ALTER TABLE `images` ENABLE KEYS ;
UNLOCK TABLES;

create table `follow`(
	`follower_id` varchar(20) not null,
    `user_id` varchar(20) not null,
    primary key(`follower_id`, `user_id`),
    constraint `fk_follow_follower` foreign key (`follower_id`) references `users`(`id`),
    constraint `fk_follow_user` foreign key (`user_id`) references `users`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `follow` WRITE;
ALTER TABLE `follow` DISABLE KEYS ;
ALTER TABLE `follow` ENABLE KEYS ;
UNLOCK TABLES;

create table `comic_report`(
	`id` int auto_increment,
    `comic_id` varchar(20) not null,
    `report_date` date not null,
	`status` int default 1 check (`status`>=1 and `status`<=2), 
    primary key(`id`),
    constraint `fk_comic_report_comicbooks` foreign key (`comic_id`) references `comicbooks`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comic_report` WRITE;
ALTER TABLE `comic_report` DISABLE KEYS ;
ALTER TABLE `comic_report` ENABLE KEYS ;
UNLOCK TABLES;

create table `comment_report`(
	`id` int auto_increment,
    `comment_id` int unsigned not null,
    `report_date` date not null,
	`status` int default 1 check (`status`>=1 and `status`<=2), 
    primary key(`id`),
    constraint `fk_comment_report_comments` foreign key (`comment_id`) references `comments`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comment_report` WRITE;
ALTER TABLE `comment_report` DISABLE KEYS ;
ALTER TABLE `comment_report` ENABLE KEYS ;
UNLOCK TABLES;

create table `report_reasons`(
	`id` int auto_increment,
    `reason` varchar(100) not null,
    `type` int not null check(`type`>=1 and `type`<=2),
    primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `report_reasons` WRITE;
ALTER TABLE `report_reasons` DISABLE KEYS ;
ALTER TABLE `report_reasons` ENABLE KEYS ;
UNLOCK TABLES;

create table `comic_report_reasons`(
	`report_id` int not null,
    `reason_id` int not null,
    primary key (`report_id`, `reason_id`),
    constraint `fk_comic_report_reasons_report` foreign key (`report_id`) references `comic_report`(`id`),
    constraint `fk_comic_report_reasons_reason` foreign key (`reason_id`) references `report_reasons`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comic_report_reasons` WRITE;
ALTER TABLE `comic_report_reasons` DISABLE KEYS ;
ALTER TABLE `comic_report_reasons` ENABLE KEYS ;
UNLOCK TABLES;

create table `comment_report_reasons`(
	`report_id` int not null,
    `reason_id` int not null,
    primary key (`report_id`, `reason_id`),
    constraint `fk_comment_report_reasons_report` foreign key (`report_id`) references `comment_report`(`id`),
    constraint `fk_comment_report_reasons_reason` foreign key (`reason_id`) references `report_reasons`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `comment_report_reasons` WRITE;
ALTER TABLE `comment_report_reasons` DISABLE KEYS ;
ALTER TABLE `comment_report_reasons` ENABLE KEYS ;
UNLOCK TABLES;

create table `annouce`(
	`id` int auto_increment,
	`receiver_id` varchar(20) not null,
    `content` text not null,
    primary key(`id`),
    constraint `fk_annouce_user` foreign key (`receiver_id`) references `users`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `annouce` WRITE;
ALTER TABLE `annouce` DISABLE KEYS ;
ALTER TABLE `annouce` ENABLE KEYS ;
UNLOCK TABLES;

create table `price`(
	`id` int auto_increment,
    `type` varchar(50) not null,
    `cost` int not null,
    primary key(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `price` WRITE;
ALTER TABLE `price` DISABLE KEYS ;
ALTER TABLE `price` ENABLE KEYS ;
UNLOCK TABLES;

create table `favorite_comic`(
	`user_id` varchar(20) not null,
    `comic_id` varchar(20) not null,
    primary key(`user_id`, `comic_id`),
    constraint `fk_favorite_comic_users` foreign key (`user_id`) references `users`(`id`),
    constraint `fk_favorite_comic_commicbooks` foreign key (`comic_id`) references `comicbooks`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `favorite_comic` WRITE;
ALTER TABLE `favorite_comic` DISABLE KEYS ;
ALTER TABLE `favorite_comic` ENABLE KEYS ;
UNLOCK TABLES;

create table `donate_history`(
	`id` int auto_increment,
	`donater_id` varchar(20) not null,
    `receiver_id` varchar(20) not null,
    `message` text default null,
    `total_money` int not null check(`total_money`>0),
    `donate_date` date not null,
    primary key(`id`),
    constraint `fk_donate_history_donater` foreign key (`donater_id`) references `users`(`id`),
    constraint `fk_donate_history_receiver` foreign key (`receiver_id`) references `users`(`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `donate_history` WRITE;
ALTER TABLE `donate_history` DISABLE KEYS ;
ALTER TABLE `donate_history` ENABLE KEYS ;
UNLOCK TABLES;









