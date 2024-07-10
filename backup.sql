-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: comicbooks_reading
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(128) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Lai Van Quy','20110708@student.hcmute.edu.vn','0352025979','admin','$2a$12$XJvoFPJBkahIlHuMhggnN./RFI5wveOkQDRY3jWQZMtbep5XoiBce');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announce`
--

DROP TABLE IF EXISTS `announce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `announce` (
  `id` varchar(50) NOT NULL,
  `receiver_id` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(15) DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `linkTo` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_announce_user` (`receiver_id`),
  CONSTRAINT `fk_announce_user` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announce`
--

LOCK TABLES `announce` WRITE;
/*!40000 ALTER TABLE `announce` DISABLE KEYS */;
INSERT INTO `announce` VALUES ('01acd65d-6840-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-21 17:36:02.217000','prf',1,'/wallet'),('0271f35e-1e3e-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 06:35:36.191000','prf',0,'/wallet'),('04a1ec66-e1da-4','US_001','laivanquy đã theo dõi bạn','2024-06-21 06:45:56.066000','fl',1,'/user/724d6e51-ea64-4'),('05573191-17dd-4','724d6e51-ea64-4','Quynevừa cập nhật ảnh đại diện','2024-06-23 19:06:59.112000','avt',1,'/user/US_001'),('05654d80-5801-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-24 06:06:32.537000','prf',0,'/wallet'),('067b5bc0-1d75-4','US_002','nguyenthib vừa bình luận về truyện của bạn với nội dung \"hay qua\"','2024-07-06 11:13:17.932000','cmt',0,'/chapter/CH_017?commentId=47'),('0699cfcd-5a12-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 02:42:16.701000','prf',1,'/wallet'),('088a0d93-a391-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"tuyet voi\"','2024-06-18 04:27:38.654000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=40'),('09c91b60-9abd-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 06:37:36.101000','prf',0,'/wallet'),('0a2a87b9-d7b0-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2.4VND','2024-06-15 16:26:09.238000','prf',1,'/wallet'),('0a7b6ef4-1e1b-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 11:40:03.228000','prf',0,'/wallet'),('0ae8d1ab-266c-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"aaa\"','2024-06-18 04:24:41.458000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=38'),('0cbd2805-60ae-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 18:15:04.264000','prf',0,'/wallet'),('0e2a80ec-7e90-4','US_001','Baonevừa cập nhật ảnh đại diện','2024-06-24 08:31:28.401000','avt',1,'/user/US_002'),('0e7a86c8-cbf3-4','US_001','nguyenthib đã theo dõi bạn','2024-07-06 16:52:34.400000','fl',0,'/user/c4866bd6-5db7-4'),('0ff0b2a8-b676-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 10VND','2024-07-09 07:17:08.424000','prf',1,'/wallet'),('106c73fc-d533-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 04:27:33.688000','prf',0,'/wallet'),('15475d2e-4501-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 8VND','2024-06-18 07:02:16.599000','prf',1,'/wallet'),('17f40f75-d94f-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 10:00:03.281000','prf',0,'/wallet'),('180f9981-56d9-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-18 06:58:16.562000','prf',1,'/wallet'),('1906d485-7d07-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"aa\"','2024-06-18 06:58:18.575000','cmt',1,'/chapter/73d14817-ed83-4?commentId=42'),('1a75346a-aeb8-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 6VND','2024-07-04 02:38:47.435000','prf',0,'/wallet'),('206bebb2-5583-4','US_002','laivanquy vừa bình luận về truyện của bạn với nội dung \"aaaa\"','2024-06-21 11:18:41.759000','cmt',1,'/chapter/CH_018?commentId=45'),('22af07aa-a90b-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-23 09:45:56.924000','prf',1,'/wallet'),('231a94ec-422b-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-20 11:15:47.802000','prf',1,'/wallet'),('284e71db-74a5-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 10VND','2024-07-08 09:22:03.369000','prf',0,'/wallet'),('2a09a2e1-2684-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-07-09 06:59:36.136000','prf',0,'/wallet'),('2e0abd56-b61b-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-10 05:05:50.410000','prf',0,'/wallet'),('310006e3-797b-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 02:36:16.842000','prf',1,'/wallet'),('36f6286c-1927-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"oh my god\"','2024-06-18 04:22:39.314000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=37'),('393c0ebc-65e4-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"aa\"','2024-07-09 04:22:09.076000','cmt',0,'/chapter/CH_019?commentId=50'),('396a4eec-3793-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-07-04 05:57:41.696000','prf',0,'/wallet'),('3d7f6cf1-30ec-4','US_001','Le Dinh Bao đã gửi tặng bạn 6666VND','2024-06-12 09:37:23.390000','dn',1,'/wallet'),('3e46e478-1cdd-4','US_001','Laviem đã gửi tặng bạn 10000VND','2024-06-21 06:46:30.849000','dn',1,'/wallet'),('4115fc37-e433-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-04 09:57:09.490000','prf',0,'/wallet'),('41885619-9109-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"kkk\"','2024-06-26 15:14:46.671000','cmt',1,'/chapter/CH_017?commentId=46'),('418e2e08-eba3-4','724d6e51-ea64-4','Quynevừa cập nhật ảnh đại diện','2024-07-10 08:56:44.828000','avt',0,'/user/US_001'),('42843f19-ade3-4','US_002','Truyen moi, truyện mà bạn thích vừa thêm 1 chương mới','2024-06-19 11:33:12.150000','fvr',1,'/comic-detail/11543b38-d56b-4'),('439a7abf-ebc1-4','US_001','Baone has updated their avatar','2024-06-08 08:10:40.733000','fl',1,'/user/US_002'),('49213ece-f189-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 8VND','2024-07-09 07:17:08.649000','prf',0,'/wallet'),('4c5169b9-9b7b-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-06-15 16:48:23.291000','prf',1,'/wallet'),('4cb509e5-4549-4','US_002','laivanquy đã theo dõi bạn','2024-06-20 18:09:59.282000','fl',1,'/user/724d6e51-ea64-4'),('5059f823-e41e-4','724d6e51-ea64-4','Quynevừa cập nhật ảnh đại diện','2024-06-23 19:07:46.448000','avt',1,'/user/US_001'),('50a5c80d-7e92-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-04 02:36:47.437000','prf',0,'/wallet'),('517a233c-a043-4','US_001','laivanquy đã theo dõi bạn','2024-06-20 18:10:14.792000','fl',1,'/user/724d6e51-ea64-4'),('519183d6-d3fd-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-24 05:46:32.631000','prf',0,'/wallet'),('51acdf94-0c61-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 31VND','2024-06-15 16:46:23.340000','prf',1,'/wallet'),('5454e8dc-2008-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 02:22:16.958000','prf',1,'/wallet'),('5465174c-1793-4','US_001','Le Dinh Bao đã gửi tặng bạn 123321VND','2024-06-12 09:30:32.796000','dn',1,'/wallet'),('5816ee38-4274-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 14:32:03.241000','prf',0,'/wallet'),('589de77d-108f-4','US_001','Le Dinh Bao đã gửi tặng bạn 10000VND','2024-06-21 17:35:39.473000','dn',1,'/wallet'),('59edacf3-d12a-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"hhhh\"','2024-06-07 10:44:20.563000','cmt',1,'/chapter/CH_018?commentId=33'),('5d3a310d-fee1-4','US_002','Lai Van Quy đã gửi tặng bạn 111111VND','2024-06-12 09:32:39.554000','dn',1,'/wallet'),('5d5eafda-f306-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-18 06:56:16.590000','prf',1,'/wallet'),('61006eb6-2e10-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-04 14:41:09.130000','prf',0,'/wallet'),('610a583a-8b21-4','US_002','Quynevừa cập nhật ảnh đại diện','2024-06-23 19:06:59.147000','avt',1,'/user/US_001'),('64a7ab25-a7fa-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 14:32:03.187000','prf',0,'/wallet'),('672d313b-f9ff-4','US_002','Quynevừa tạo 1 truyện mới','2024-06-18 08:13:19.527000','ncm',1,'/comic-detail/11543b38-d56b-4'),('676bcfb9-718c-4','US_001','Baone đã theo dõi bạn','2024-06-23 09:44:57.070000','fl',1,'/user/US_002'),('6d50aea3-8e38-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"dhhjs\"','2024-07-09 04:22:15.987000','cmt',0,'/chapter/CH_019?commentId=52'),('7141bc9b-4f2f-4','US_001','Le Dinh Bao đã gửi tặng bạn 5445VND','2024-06-12 09:38:15.554000','dn',1,'/wallet'),('7266b03d-40fd-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:20:03.204000','prf',0,'/wallet'),('761c7e6a-621f-4','US_002','Quyne đã theo dõi bạn','2024-06-08 08:59:10.325000','fl',1,'/user/US_001'),('76ddd30c-0aca-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 6VND','2024-06-18 07:00:16.599000','prf',1,'/wallet'),('781319ab-1880-4','US_002','laivanquy vừa bình luận về truyện của bạn với nội dung \"aaa\"','2024-06-21 11:18:38.289000','cmt',1,'/chapter/CH_018?commentId=44'),('7a0741d0-88d6-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-07-04 02:38:47.522000','prf',0,'/wallet'),('7bd504dd-cee4-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 07:54:16.576000','prf',1,'/wallet'),('7d448d91-0668-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1.6VND','2024-06-15 16:28:08.980000','prf',1,'/wallet'),('805503d0-6963-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-07-08 09:22:03.267000','prf',0,'/wallet'),('81ff6630-6371-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"hahaha\"','2024-06-12 08:49:32.570000','cmt',1,'/chapter/CH_016?commentId=34'),('823ca74b-d0de-4','724d6e51-ea64-4','Baonevừa cập nhật ảnh đại diện','2024-06-23 09:43:04.232000','avt',1,'/user/US_002'),('831797ae-ea08-4','724d6e51-ea64-4','Baonevừa cập nhật ảnh đại diện','2024-06-24 08:31:28.381000','avt',1,'/user/US_002'),('849d333d-21c0-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"qua hay\"','2024-06-18 04:27:26.746000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=39'),('874e9a1e-c800-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 07:04:16.604000','prf',1,'/wallet'),('876cf5ad-8cc0-4','US_001','Baonevừa cập nhật ảnh đại diện','2024-06-23 09:43:04.295000','avt',1,'/user/US_002'),('87d60ddc-87cc-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:34:03.199000','prf',0,'/wallet'),('897aa97e-b09e-4','US_002','Quynevừa cập nhật ảnh đại diện','2024-06-23 19:07:46.465000','avt',1,'/user/US_001'),('898f4242-0c91-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-20 12:05:47.715000','prf',1,'/wallet'),('8a46f6ee-657c-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"cut bo\"','2024-06-07 10:43:36.265000','cmt',1,'/chapter/CH_017?commentId=32'),('8ab65b9e-d82a-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-21 11:19:42.382000','prf',1,'/wallet'),('8de3212c-af65-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-21 17:36:02.325000','prf',1,'/wallet'),('923f0181-c5c9-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"hihi\"','2024-06-18 02:52:11.912000','cmt',1,'/chapter/CH_017?commentId=35'),('95224791-22c7-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 07:25:08.418000','prf',0,'/wallet'),('98269ded-cbbc-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-24 07:28:32.433000','prf',1,'/wallet'),('9f314289-0044-4','US_001','Le Dinh Bao đã gửi tặng bạn 9999VND','2024-06-12 09:36:44.524000','dn',1,'/wallet'),('a1cf31e5-22cd-4','US_002','Quyne vừa bình luận về truyện của bạn với nội dung \"adu\"','2024-06-07 10:33:50.829000','cmt',1,'/chapter/CH_016?commentId=31'),('a2cbbdf6-8256-4','c4866bd6-5db7-4','nguyenthib vừa bình luận về truyện của bạn với nội dung \"dd\"','2024-07-06 16:51:46.404000','cmt',1,'/chapter/08dccd38-4c1a-4?commentId=48'),('a2de15a3-f9a2-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-20 12:01:47.739000','prf',1,'/wallet'),('a56fc73c-c2e1-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-20 12:05:47.777000','prf',1,'/wallet'),('a5742a27-0a6f-4','US_001','Le Dinh Bao đã gửi tặng bạn 13313VND','2024-06-12 09:39:15.596000','dn',1,'/wallet'),('a682900b-7773-4','US_002','Quynevừa cập nhật ảnh đại diện','2024-06-26 15:16:31.486000','avt',0,'/user/US_001'),('a74714d4-ef5b-4','724d6e51-ea64-4','Quyne đã theo dõi bạn','2024-06-24 10:27:46.114000','fl',1,'/user/US_001'),('a855c61a-546a-4','US_002','Quynevừa cập nhật ảnh đại diện','2024-07-10 08:56:44.925000','avt',0,'/user/US_001'),('aaa0b7b2-b79c-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-06 17:50:59.211000','prf',0,'/wallet'),('ac4ebac6-7738-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"shhs\n\"','2024-07-09 04:22:28.254000','cmt',0,'/chapter/CH_019?commentId=53'),('ad46ef0c-9ee8-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-24 06:06:32.455000','prf',1,'/wallet'),('adced037-ba3a-4','US_002','Quynevừa cập nhật ảnh đại diện','2024-06-21 17:54:29.229000','avt',1,'/user/US_001'),('b5746b48-b806-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 10VND','2024-07-09 06:57:36.127000','prf',0,'/wallet'),('b6f5d047-b963-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 04:11:33.672000','prf',0,'/wallet'),('b71c567f-82b8-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-02 07:35:18.963000','prf',0,'/wallet'),('bb30dba3-76b9-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:48:03.283000','prf',0,'/wallet'),('bd58b7d1-4552-4','US_001','Baone đã gửi tặng bạn 123123VND','2024-06-12 07:43:18.885000','dn',1,'/wallet'),('be0648cb-d3c2-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:28:03.326000','prf',0,'/wallet'),('c1720e3d-ab04-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"h\"','2024-06-18 06:53:28.016000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=41'),('c3c42c25-c130-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-20 18:11:00.230000','prf',1,'/wallet'),('c3e26579-d5f2-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-21 17:54:02.227000','prf',1,'/wallet'),('c4e945a7-dfc8-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-24 05:46:32.502000','prf',1,'/wallet'),('c5185032-22a0-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-03 17:25:15.112000','prf',0,'/wallet'),('c6e380b6-2242-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 06:35:36.105000','prf',0,'/wallet'),('c98c9c9e-4d85-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:28:03.259000','prf',0,'/wallet'),('c9b04968-c30e-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:00:03.273000','prf',0,'/wallet'),('cbfadb45-64f0-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-21 06:53:42.443000','prf',1,'/wallet'),('ccacbbb4-e7e4-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 15:01:26.848000','prf',1,'/wallet'),('cd851a20-28c3-4','US_002','nguyenthib vừa bình luận về truyện của bạn với nội dung \"hy\n\"','2024-07-06 17:50:49.338000','cmt',0,'/chapter/CH_018?commentId=49'),('d13e0866-a17a-4','US_002','Truyen moi, truyện mà bạn thích vừa thêm 1 chương mới','2024-06-19 08:14:23.957000','fvr',1,'/comic-detail/11543b38-d56b-4'),('d4d73ec7-d9c9-4','US_001','Baone vừa cập nhật ảnh đại diện','2024-06-08 08:23:39.788000','avt',1,'/user/US_002'),('d7dad3e0-a994-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"adjdj\"','2024-07-09 04:22:12.445000','cmt',0,'/chapter/CH_019?commentId=51'),('dab747cf-5ae1-4','US_002','Lai Van Quy đã gửi tặng bạn 10000VND','2024-06-21 17:44:49.385000','dn',1,'/wallet'),('db57303d-2c75-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 4VND','2024-06-26 15:15:18.803000','prf',0,'/wallet'),('de7492ca-7380-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-09 04:19:33.615000','prf',0,'/wallet'),('e14dcfea-3fcb-4','US_002','Truyen moi, truyện mà bạn thích vừa thêm 1 chương mới','2024-07-04 05:52:52.064000','fvr',0,'/comic-detail/11543b38-d56b-4'),('e1ab1846-4bb2-4','US_002','Quyne vừa cập nhật ảnh đại diện','2024-06-07 10:34:23.768000','fl',1,'/user/US_001'),('e2b36c85-5cee-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 02:58:16.657000','prf',1,'/wallet'),('e761a3f3-238f-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"Hay quá\"','2024-06-18 02:56:34.157000','cmt',1,'/chapter/809f0d31-d2e0-4?commentId=36'),('e92c15d8-b001-4','724d6e51-ea64-4','Quynevừa cập nhật ảnh đại diện','2024-06-26 15:16:31.472000','avt',1,'/user/US_001'),('edb440fb-6a24-4','724d6e51-ea64-4','Quynevừa cập nhật ảnh đại diện','2024-06-21 17:54:29.215000','avt',1,'/user/US_001'),('eeb1ece2-c1a1-4','US_002','Quynevừa tạo 1 truyện mới','2024-06-18 08:19:14.329000','ncm',1,'/comic-detail/2421bff1-fb11-4'),('f2472d08-0436-4','US_002','laivanquy vừa bình luận về truyện của bạn với nội dung \"aa\"','2024-06-21 11:18:35.138000','cmt',1,'/chapter/CH_018?commentId=43'),('f380d822-23f6-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 09:46:03.223000','prf',0,'/wallet'),('f3c0fc2f-b574-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 8VND','2024-06-17 08:19:18.714000','prf',1,'/wallet'),('f4c53869-4d56-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-06 11:13:34.383000','prf',0,'/wallet'),('f6ef12b9-a417-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-26 15:27:18.766000','prf',0,'/wallet'),('f7f3342e-5008-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 10:32:03.269000','prf',0,'/wallet'),('f8e2f0ee-cefe-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-06 10:45:34.411000','prf',0,'/wallet'),('f90ae0a7-2c50-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-10 05:07:50.366000','prf',0,'/wallet'),('f99c413d-9c8c-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-20 11:15:47.909000','prf',1,'/wallet'),('faf1fbce-a7c9-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-06-18 09:43:26.937000','prf',1,'/wallet'),('fb47b762-e330-4','US_001','Le Dinh Bao đã gửi tặng bạn 11221VND','2024-06-12 09:38:52.391000','dn',1,'/wallet'),('fb8f5aec-077c-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 2VND','2024-07-08 11:40:03.284000','prf',0,'/wallet'),('fff1605c-4394-4','c4866bd6-5db7-4','Quynevừa cập nhật ảnh đại diện','2024-07-10 08:56:44.913000','avt',0,'/user/US_001');
/*!40000 ALTER TABLE `announce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `chapters` (
  `id` varchar(20) NOT NULL,
  `chapter_name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `comicbook_id` varchar(20) NOT NULL,
  `publish_date` date DEFAULT NULL,
  `ordinal_number` int(10) unsigned NOT NULL,
  `public` tinyint(1) DEFAULT '0',
  `isAccepted` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_chapters_comicbooks` (`comicbook_id`),
  CONSTRAINT `fk_chapters_comicbooks` FOREIGN KEY (`comicbook_id`) REFERENCES `comicbooks` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES ('08dccd38-4c1a-4','Chapter 1','0bf99505-463a-4','2024-07-06',1,1,1),('23a09857-b2d9-4','abcde123','B_005',NULL,29,0,1),('2a8f0e11-1add-4','b','B_005','2024-06-09',8,1,1),('2e54a8cc-ff7e-4','jjjs','B_005',NULL,27,0,1),('3be0a0c3-a9e2-4','chuong nhay cam','B_005','2024-07-10',21,0,1),('3d09e0f9-c547-4','aaaaaaa','B_005','2024-06-10',11,1,1),('3d2fa003-905d-4','Chapter 1','11543b38-d56b-4','2024-06-18',1,1,1),('3e731ad5-107a-4','chuong nhay cam2','B_005',NULL,18,0,0),('4c286372-ee38-4','develop','2421bff1-fb11-4','2024-06-19',1,1,1),('50c4b851-9133-4','gangter','B_005',NULL,28,0,1),('5ef4c45c-ed8e-4','aaaa','B_005','2024-06-09',9,1,1),('6bbde778-31df-4','Chapter 1','f5f5c864-cb44-4','2024-06-21',1,1,1),('6f1b49ed-e72a-4','100,000','B_005',NULL,22,0,0),('73d14817-ed83-4','lead to=result in=cause','B_005','2024-06-10',12,1,1),('775dd348-8396-4','Lại Văn Quý','11543b38-d56b-4','2024-07-04',4,1,1),('8017591d-e9d9-4','dddd','B_005',NULL,30,0,1),('809f0d31-d2e0-4','Chương 3','B_005','2024-06-09',3,1,1),('91e63687-ff2e-4','100,000','B_013',NULL,4,0,0),('9dbddca1-e625-4','hihahiho','B_005',NULL,25,0,1),('9fae2309-b8d8-4','chuong nhay cam','B_013','2024-07-10',2,0,1),('a38ca8e3-e288-4','chuong nhay cam','B_005',NULL,23,0,1),('a43f6218-0365-4','ss','B_005',NULL,26,0,1),('a462f297-ebe6-4','kakakka','B_005',NULL,20,0,0),('b23b3ae2-517e-4','Chuong moi ne','B_005','2024-06-09',6,1,1),('bc4e99ce-117b-4','chuong nhay cam','2421bff1-fb11-4','2024-07-10',3,0,1),('bf690467-165d-4','a','B_005','2024-06-09',7,1,1),('c2da57c8-0f03-4','aa','B_005',NULL,16,0,0),('c58bcc7c-bf89-4','jjj','B_005',NULL,19,0,1),('c8faeaa8-0fd2-4','oppa','2421bff1-fb11-4','2024-06-19',2,1,1),('ccc6dbb5-0a12-4','Lại Văn Quý','11543b38-d56b-4','2024-06-19',3,1,1),('ce0ae7bb-abda-4','hi','B_005','2024-06-15',13,0,1),('cf54a49d-f618-4','testTb','11543b38-d56b-4','2024-06-19',2,1,1),('cfeb04ec-adce-4','','B_005','2024-07-10',15,0,0),('CH_001','Giới thiệu','B_001','2023-12-23',1,0,1),('CH_002','Vụ án đầu tiên','B_001','2023-12-23',2,0,1),('CH_007','Chapter 11111111111111111111111111111','B_004','2023-12-23',1,0,1),('CH_008','Chapter 2','B_004','2023-12-23',2,0,1),('CH_009','Chapter 2','B_005','2023-12-23',1,0,1),('CH_010','Chapter 22','B_005','2023-12-23',2,1,1),('CH_013','Chapter 1','B_007','2023-12-23',1,1,1),('CH_014','Chapter 2','B_007','2023-12-23',2,1,1),('CH_015','Chapter 1','B_008','2023-12-23',1,0,1),('CH_016','Chapter 2','B_008','2023-12-23',2,0,1),('CH_017','Chapter 1','B_009','2023-12-23',1,1,1),('CH_018','Chapter 2','B_009','2023-12-23',2,1,1),('CH_019','Chapter 1','B_010','2023-12-23',1,1,1),('CH_020','Chapter 2','B_010','2023-12-23',2,1,1),('dce80b76-2445-4','chuong nhay cam','B_005',NULL,17,0,0),('e36a0184-bfeb-4','Lại Văn Quý','B_005','2024-06-09',5,1,1),('e823bf45-7724-4','Chapter 1','B_013',NULL,1,0,0),('ea794a69-0843-4','hahaha','B_005',NULL,14,0,1),('f0ef5479-6288-4','hehehe','B_005',NULL,24,0,0),('f3b0f5c4-4724-4','develop','B_005','2024-06-09',4,1,1),('f47727d0-8275-4','hahhaha','B_005','2024-06-09',10,1,1),('fcc9dc5a-2a86-4','hi','B_013',NULL,3,0,0);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comic_report`
--

DROP TABLE IF EXISTS `comic_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comic_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comic_id` varchar(20) NOT NULL,
  `report_date` date NOT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_comic_report_comicbooks` (`comic_id`),
  CONSTRAINT `fk_comic_report_comicbooks` FOREIGN KEY (`comic_id`) REFERENCES `comicbooks` (`id`),
  CONSTRAINT `comic_report_chk_1` CHECK (((`status` >= 1) and (`status` <= 2)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic_report`
--

LOCK TABLES `comic_report` WRITE;
/*!40000 ALTER TABLE `comic_report` DISABLE KEYS */;
INSERT INTO `comic_report` VALUES (6,'B_022','2024-06-18',1);
/*!40000 ALTER TABLE `comic_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comic_report_reasons`
--

DROP TABLE IF EXISTS `comic_report_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comic_report_reasons` (
  `report_id` int(11) NOT NULL,
  `reason_id` int(11) NOT NULL,
  PRIMARY KEY (`report_id`,`reason_id`),
  KEY `fk_comic_report_reasons_reason` (`reason_id`),
  CONSTRAINT `fk_comic_report_reasons_reason` FOREIGN KEY (`reason_id`) REFERENCES `report_reasons` (`id`),
  CONSTRAINT `fk_comic_report_reasons_report` FOREIGN KEY (`report_id`) REFERENCES `comic_report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic_report_reasons`
--

LOCK TABLES `comic_report_reasons` WRITE;
/*!40000 ALTER TABLE `comic_report_reasons` DISABLE KEYS */;
INSERT INTO `comic_report_reasons` VALUES (6,2);
/*!40000 ALTER TABLE `comic_report_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comicbooks`
--

DROP TABLE IF EXISTS `comicbooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comicbooks` (
  `id` varchar(20) NOT NULL,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `isPremium` tinyint(1) DEFAULT '0',
  `actor_id` varchar(20) NOT NULL,
  `image` text,
  `discription` text,
  `view` int(10) unsigned NOT NULL DEFAULT '0',
  `rate` decimal(2,1) NOT NULL,
  `publish_date` date NOT NULL,
  `update_date` date NOT NULL,
  `status` int(11) DEFAULT '2',
  `pre_view` int(10) unsigned NOT NULL DEFAULT '0',
  `public` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comicbooks_users` (`actor_id`),
  CONSTRAINT `fk_comicbooks_users` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comicbooks_chk_1` CHECK (((`status` >= 1) and (`status` <= 3)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comicbooks`
--

LOCK TABLES `comicbooks` WRITE;
/*!40000 ALTER TABLE `comicbooks` DISABLE KEYS */;
INSERT INTO `comicbooks` VALUES ('0bf99505-463a-4','Truyen moi',0,'c4866bd6-5db7-4','772d7edd7aa14065b2a361a4b3672378.jpg','Mở đầu câu truyện, cậu học sinh trung học 17 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường xuất sắc. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ Ran Mori, cậu tình cờ chứng kiến vụ một án giết người, Kishida - một hành khách trong trò chơi Chuyến tàu tốc hành đã bị giết một cách dã man. Cậu đã giúp cảnh sát làm sáng tỏ vụ án. Trên đường về nhà, cậu vô tình phát hiện một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Khi chúng phát hiện ra cậu, Shinichi đã bị đánh ngất đi. Sau đó những người đàn ông áo đen đó đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy mình đã bị teo nhỏ lại thành hình dạng của một cậu học sinh tiểu học.',1,0.0,'2024-07-06','2024-07-06',1,0,0),('11543b38-d56b-4','Truyen moi',0,'US_001','431dfdba3c1a44749738e0f8d89189cb.jpg','Day la mo ta',3,0.0,'2024-06-18','2024-07-04',3,0,0),('2421bff1-fb11-4','Truyen tap nham',1,'US_001','e5a07720a22347b2809e1d945d9f54b0.jpg','Day la mo ta',4,0.0,'2024-06-18','2024-07-10',1,0,0),('B_001','Conan',1,'US_001','56230picture16309480627.jpg','Mở đầu câu truyện, cậu học sinh trung học 17 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường xuất sắc. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ Ran Mori, cậu tình cờ chứng kiến vụ một án giết người, Kishida - một hành khách trong trò chơi Chuyến tàu tốc hành đã bị giết một cách dã man. Cậu đã giúp cảnh sát làm sáng tỏ vụ án. Trên đường về nhà, cậu vô tình phát hiện một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Khi chúng phát hiện ra cậu, Shinichi đã bị đánh ngất đi. Sau đó những người đàn ông áo đen đó đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy mình đã bị teo nhỏ lại thành hình dạng của một cậu học sinh tiểu học.',29,5.0,'2023-12-23','2024-06-01',1,29,0),('B_004','Brave Bell',1,'US_001','yruewjdhfjrydhfndfheidjfn.jpg','Sanada Souji, học sinh cuối cấp trung học, thông minh và khoẻ mạnh. Anh ấy cũng có bản chất tốt bụng và không ngần ngại giúp đỡ những người gặp khó khăn. Tuy nhiên, gia đình anh là yakuza. Vì điều này mà anh bị những người xung quanh ghét bỏ. Liệu sự cô đơn này có kéo dài mãi mãi? Trong khi sự lo lắng chiếm lấy tâm trí anh, anh nhận được một cuộc điện thoại và mọi thứ bắt đầu diễn ra theo chiều hướng bất ngờ. Đây là câu chuyện anh hùng của một chàng trai trẻ muốn trở thành anh hùng và phải đối mặt với một tổ chức khổng lồ bí ẩn.',69,4.0,'2023-12-23','2024-06-01',1,69,0),('B_005','Người Đàn Ông Mít Ướt',0,'US_001','yrfugdhbvfgherukjsdnamew.jpg','Một câu chuyện nặng nề về tâm lý, về những tên tâm thần. Nhân vật chính là một người đàn ông mít ướt nhút nhát đã có gia đình, nợ nần chồng chất vì cờ bạc. Anh không có cách nào lật ngược tình thế cho đến khi ông chủ của một công ty cho vay mờ ám giao cho anh công việc đòi nợ vì thân hình to lớn bất thường của anh. Đòi nợ không phải là công việc duy nhất. Thỉnh thoảng, anh ta được giao những công việc lặt vặt mờ ám khác, chẳng hạn như làm tài xế cho gái mại dâm và vận chuyển những thứ mờ ám (xác).',212,4.0,'2023-12-23','2024-07-10',1,212,0),('B_007','INITIAL D',0,'US_001','dfhbvfbgyufejhwenwihriefncdfvefe.jpg','Câu chuyện kể về một chiếc xe mang nhãn hiệu 86 huyền thoại có tốc độ di chuyển như sấm sét được mệnh danh là “Bóng ma của núi Akina” cùng với con đường chinh phục đỉnh cao của thế giới đua xe mạo hiểm của một cậu bé 18 tuổi Takumi Fujiwara. Được thừa hưởng dòng máu từ một tay đua siêu phàm, Takumi sớm đã bộc lộ năng lực và tố chất bẩm sinh khi chỉ mới 13 tuổi, dưới sự dìu dắt của cha mình cậu đã nhanh chóng hoàn thiện các kỹ năng bậc nhất trong nghệ thuật đua xe.',105,4.1,'2023-12-23','2023-12-23',1,105,0),('B_008','THẦN SỦNG TIẾN HÓA',0,'US_002','bjsndwuihdnwjbduhdndjsh.jpg','Thiên địa dị biến, yêu thú sinh sôi, kỷ nguyên mới của nhân loại đã cho ra đời 1 nghề nghiệp mới: thu phục quái vật, nuôi dưỡng quái vật, huấn luyện quái vật, đây chính là nghề Ngự Sử',57,4.6,'2023-12-23','2023-12-23',1,57,0),('B_009','Võ Luyện Đỉnh Phong',0,'US_002','dshdbsvhdfbhdguefbhefbsfbjsfbehgfjsb.jpg','Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông tha, mới có thể có thể phá võ chi cực đạo.',41,4.3,'2023-12-23','2023-12-23',1,41,0),('B_010','The Kingdom of Ruin',0,'US_001','qtwyeuirtrkfgnvxcanfdjhf.jpg','Con người từ xưa đã sống dưới sự bảo hộ của phù thủy, họ tôn kính, biết ơn và đồng thời cũng cảm thấy ... KHIẾP SỢ trước năng lực của các phù thủy. Con người muốn nổi dậy, muốn chứng minh rằng thế giới hiện nay là do họ làm chủ ...',42,4.1,'2023-12-23','2023-12-23',1,42,0),('B_011','Sự Trỗi Dậy Của Anh Hùng Thất Nghiệp',0,'US_001','adbsjfeuhrwndfhsfhvdhgwiuejw.jpg','Karna là cậu bé được phong cho danh hiệu Bậc hiền nhân từ thiên đàng, cậu được thu nhận vào một đội anh hùng. Nhưng kĩ năng Gọi hồn của cậu lại quá kinh tởm nên cậu bị đá khỏi đội ngay lập tức và trở thành kẻ thất nghiệp',1188,4.1,'2023-12-23','2023-12-23',1,1188,0),('B_012','Con Gái Của Mafia',0,'US_002','dbfhjbdsbfeygruwhiwfbhjdbvdjbfef.jpg','Câu chuyện kể về một chàng trai bình thường tên Mekh, cuộc đời sắp thay đổi vào thời điểm anh vô tình đụng phải cô gái khét tiếng và dễ bị hiểu lầm tên Saran.',9,4.9,'2023-12-23','2023-12-23',1,8,0),('B_013','Dr.slump',0,'US_001','wdnwjheuwhdjbdegfudfbrbdbsbvbdjf.jpg','Nhân vật chính của truyện là Arale, một cô bé robot giống hệt con người (tương tự nhân vật Pinocchio trong truyện thiếu nhi Ý). Tiến sĩ Slump tạo ra Arale nhằm khẳng định tài năng siêu việt của mình.',232,4.6,'2023-12-23','2024-07-10',1,232,0),('B_014','The Fable - The Second Contact',0,'US_002','adwfedhwhncvbxvdanskadjsdhws.jpg','Nối tiếp câu chuyện của Sát Thủ Ẩn Dật',425,4.7,'2023-12-23','2023-12-23',1,425,0),('B_015','Kagurabachi',0,'US_001','dwehwjfndhgwdwjrywgwbcjsdbwgeqhewgr.jpg','Cậu bé Chihiro dành cả ngày để luyện tập dưới sự hướng dẫn của người cha rèn kiếm nổi tiếng của mình. Một ngày nào đó anh hy vọng sẽ trở thành một thợ rèn kiếm vĩ đại',360,4.4,'2023-12-23','2023-12-23',1,360,0),('B_016','One-Punch Man',0,'US_002','MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzAtYzUwOWQyM2E3OGI2XkEyXkFqcGdeQXVyNTgyNTA4MjM.jpg','Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama, một con người mà nhìn đâu cũng thấy “tầm thường”, từ khuôn mặt vô hồn, cái đầu trọc lóc, cho tới thể hình long tong',575,4.9,'2023-12-23','2023-12-23',1,575,0),('B_017','Gia Tộc Điệp Viên Yozakura (REUP)',0,'US_001','ssdeheuheufegfdufdufhue.png','Taiyou Asano là 1 học sinh cao trung gặp vấn đề trong việc giao tiếp với mọi người. Bạn thời thơ ấu của cậu ta, Mutsumi Yozakura, là người duy nhất có thể nói chuyện bình thường với Taiyou. Rồi 1 ngày cậu phát hiện ra Mutsumi là thành viên của 1 gia đình điệp viên!',38,4.5,'2023-12-23','2023-12-23',1,38,0),('B_018','Deatte 5 Byou de Battle',0,'US_002','dwegwjqkndwjheugfdbchdw.jpg','Một ngày nọ, cậu học sinh cao trung mê game, cuồng kẹo Shiroyanagi Akira bị kéo vào một trận chiến bởi một cô gái bí ẩn tự xưng là Mion. Những người tham gia được thông báo rằng họ đã bị xóa tên khỏi hộ khẩu gia đình, tham gia vào một thí nghiệm và được ban sức mạnh đặc biệt.',335,3.7,'2023-12-23','2023-12-23',1,335,0),('B_019','Blue Lock',0,'US_001','sdbegdjegfjdgfshfyjegfyejgfdfguryteh.jpg','Yoichi Isagi đã bỏ lỡ cơ hội tham dự giải Cao Trung toàn quốc do đã chuyền cho đồng đội thay vì tự thân mình dứt điểm. Cậu là một trong 300 chân sút U-18 được tuyển chọn bởi Jinpachi Ego, người đàn ông được Hiệp Hội Bóng Đá Nhật Bản thuê sau hồi FIFA World Cup năm 2018, nhằm dẫn dắt Nhật Bản vô địch World Cup bằng cách tiêu diệt nền bóng đá Nhật Bản.',348,5.0,'2023-12-23','2023-12-23',1,348,0),('B_020','Gachi Akuta',0,'US_002','sdbwhhuewhruehturthnvdfndvi.jpg','Một khu ổ chuột nơi con cháu của những tên tội phạm sinh sống. Người dân bên kia biên giới coi thường anh như một bộ tộc và bị kỳ thị. Rudo, một đứa trẻ mồ côi, sống trong một khu ổ chuột với cha mẹ của mình, Legt, và kiếm sống bằng cách sử dụng những khả năng thể chất khác xa so với những người bình thường.',798,4.8,'2023-12-23','2023-12-23',1,798,0),('B_021','Gậy Gỗ Cấp 99+',0,'US_001','dgsjdbsndvbsjdbsndbsjdghbshdshj.jpg','Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!Thanh niên main trong game thực tế ảo bị gái lừa giết chết rồi vô tình được cho 1 chiếc gậy gỗ tân thủ. Bug game khiến cho main cường hóa cây gậy này lên cấp 99+ tối đa. Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!',259,4.6,'2023-12-23','2023-12-23',1,259,0),('B_022','Tomb Raider King',0,'US_002','98736tuyejwhdbshsgdwkjdsb.jpg','Hầm mộ của những vị thân xuất hiện ở khắp nơi trên thế giới, và ở những nơi đó cũng chôn cất rất nhiều thánh tích mang sức mạnh của những vị thần. Câu chuyện kể về một tên trộm với tài năng dị biệt muốn thu thập tất cả các thánh tích.',104,4.8,'2023-12-23','2023-12-23',1,104,0),('B_023','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','wdgfsyjhbdhsydhwuyeryr347eyhwudksh.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',76,4.7,'2023-12-23','2023-12-23',1,76,0),('B_024','Kengan Ashura',0,'US_002','sdgyejhdbeyr7ery47yrhusdbdhfbdjc.jpg','Từ thời Edo đã tồn tại các đầu trường, mà tại đó các thương gia thuê đấu sĩ đấu tay không với nhau, bên nào thắng sẽ có tất cả. Tokita Ouma, biệt danh là Ashura tham gia đấu trường và đánh thắng tất cả các đấu thủ của mình.',100,4.8,'2023-12-23','2023-12-23',1,100,0),('B_025','Tòa Tháp Bí Ẩn',0,'US_001','iturekjhdeygrhdejdbvhdvb.jpg','Mong muốn của bạn là gì ? Tiền ? Vinh quang ? Quyền lực ? sự báo thù ? hay một điều gì vượt trội hơn?Những gì mà bạn mong muốn ... đều ở đây !',90,4.2,'2023-12-23','2023-12-23',1,90,0),('B_026','Y Võ Chí Tôn',0,'US_001','hfuer3iuiejdefhdyjhbsjdbasjdbsn.jpg','Truyện tranh Y Võ Chí Tôn được cập nhật nhất và đầy đủ nhất tại TruyenTranhLH.net. Hãy ghé thăm TruyenTranhLH.net mỗi ngày để được đọc các chương mới nhất của Y Võ Chí Tôn.',78,4.8,'2023-12-23','2023-12-23',1,78,0),('B_027','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','dehgfdehjdbwjfbyrt4ty3u.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',200,3.8,'2023-12-23','2023-12-23',1,200,0),('B_028','Area no kishi',0,'US_001','reury74736726474y37ryheudh.jpg','Nghĩ rằng mình là một thằng bất tài, Aizawa Kakeru từ bỏ giấc mơ cầu thủ để trở thành manager của đội bóng đá của trưởng. Nhưng thực chất cậu lại có một tài năng vô cùng tuyệt vời mà chỉ có Suguru - anh trai cậu đồng thời cũng là tuyển thủ của đội tuyển quốc gia Nhật Bản nhận ra được. Mọi chuyện ngày càng phức tạp hơn khi Seven - một người bạn thời thơ ấu mà Kakeru đem lòng yêu mến xuất hiện...',334,4.8,'2023-12-23','2023-12-23',1,334,0),('B_029','Naruto',0,'US_002','sdfrer454676.jpg','Naruto là một cậu bé có mơ ước trở thành hokage của làng Konoha,được Hokage phong ấn trong người một trong 9 quái vật của thể giới : Cửu vĩ Hồ ly.Vì cho cậu là một con quái vật, ko ai dám chơi với cậu!',422,4.1,'2023-12-23','2023-12-23',1,422,0),('B_030','Katsu!',0,'US_001','sdjnejfjefueijrwijewije83u4jeo2.jpg','Ờ thì trong một thành phố nào đó ở Nhật, có một chàng trai tình cờ gặp được một cô gái xinh đẹp. Do phải lòng nàng, chàng đã đăng kí vào một phòng tập boxing do cha nàng làm chủ, nhưng không may thay là cha mẹ nàng đã ly hôn còn nàng thì lại cực kì ghét boxing. Rồi chuyện tình éo le của đôi \"uyên ương\" này sẽ về đâu?',223,4.8,'2023-12-23','2023-12-23',1,223,0),('f5f5c864-cb44-4','Truyen moi ne',0,'724d6e51-ea64-4','d88e3385f5cf4773af67c36ebcb86f3b.jpg','123321',2,0.0,'2024-06-21','2024-06-21',1,0,0);
/*!40000 ALTER TABLE `comicbooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comicbooks_genres`
--

DROP TABLE IF EXISTS `comicbooks_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comicbooks_genres` (
  `genre_id` varchar(20) NOT NULL,
  `comicbook_id` varchar(20) NOT NULL,
  PRIMARY KEY (`genre_id`,`comicbook_id`),
  KEY `fk_comicbooks_comic` (`comicbook_id`),
  CONSTRAINT `fk_comicbooks_comic` FOREIGN KEY (`comicbook_id`) REFERENCES `comicbooks` (`id`),
  CONSTRAINT `fk_comicbooks_genres` FOREIGN KEY (`genre_id`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comicbooks_genres`
--

LOCK TABLES `comicbooks_genres` WRITE;
/*!40000 ALTER TABLE `comicbooks_genres` DISABLE KEYS */;
INSERT INTO `comicbooks_genres` VALUES ('GR_02','0bf99505-463a-4'),('GR_04','0bf99505-463a-4'),('GR_05','11543b38-d56b-4'),('GR_01','2421bff1-fb11-4'),('GR_02','B_001'),('GR_03','B_001'),('GR_07','B_004'),('GR_08','B_005'),('GR_09','B_005'),('GR_05','B_007'),('GR_10','B_007'),('GR_01','B_008'),('GR_08','B_008'),('GR_02','B_009'),('GR_07','B_009'),('GR_04','B_010'),('GR_10','B_010'),('GR_08','B_011'),('GR_09','B_011'),('GR_03','B_012'),('GR_10','B_012'),('GR_06','B_013'),('GR_07','B_013'),('GR_09','B_013'),('GR_01','B_014'),('GR_02','B_014'),('GR_03','B_015'),('GR_07','B_015'),('GR_08','B_015'),('GR_05','B_016'),('GR_06','B_016'),('GR_01','B_017'),('GR_04','B_017'),('GR_02','B_018'),('GR_03','B_018'),('GR_09','B_019'),('GR_10','B_019'),('GR_03','B_020'),('GR_05','B_020'),('GR_02','B_021'),('GR_03','B_021'),('GR_04','B_021'),('GR_05','B_022'),('GR_07','B_022'),('GR_08','B_022'),('GR_02','B_023'),('GR_09','B_023'),('GR_04','B_024'),('GR_05','B_024'),('GR_06','B_024'),('GR_01','B_025'),('GR_05','B_025'),('GR_06','B_025'),('GR_07','B_025'),('GR_10','B_025'),('GR_02','B_026'),('GR_08','B_026'),('GR_10','B_026'),('GR_03','B_027'),('GR_08','B_027'),('GR_03','B_028'),('GR_10','B_028'),('GR_02','B_029'),('GR_05','B_029'),('GR_01','B_030'),('GR_07','B_030'),('GR_05','f5f5c864-cb44-4');
/*!40000 ALTER TABLE `comicbooks_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_report`
--

DROP TABLE IF EXISTS `comment_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(10) unsigned NOT NULL,
  `report_date` date NOT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_comment_report_comments` (`comment_id`),
  CONSTRAINT `fk_comment_report_comments` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `comment_report_chk_1` CHECK (((`status` >= 1) and (`status` <= 2)))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_report`
--

LOCK TABLES `comment_report` WRITE;
/*!40000 ALTER TABLE `comment_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_report_reasons`
--

DROP TABLE IF EXISTS `comment_report_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment_report_reasons` (
  `report_id` int(11) NOT NULL,
  `reason_id` int(11) NOT NULL,
  PRIMARY KEY (`report_id`,`reason_id`),
  KEY `fk_comment_report_reasons_reason` (`reason_id`),
  CONSTRAINT `fk_comment_report_reasons_reason` FOREIGN KEY (`reason_id`) REFERENCES `report_reasons` (`id`),
  CONSTRAINT `fk_comment_report_reasons_report` FOREIGN KEY (`report_id`) REFERENCES `comment_report` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_report_reasons`
--

LOCK TABLES `comment_report_reasons` WRITE;
/*!40000 ALTER TABLE `comment_report_reasons` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_report_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `chapter_id` varchar(20) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comments_users` (`user_id`),
  KEY `fk_comments_chapters` (`chapter_id`),
  CONSTRAINT `fk_comments_chapters` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`),
  CONSTRAINT `fk_comments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (6,'US_001','CH_017','2024-05-16 06:32:17.600000','nhu cut'),(7,'US_001','CH_015','2024-06-06 16:02:52.052000','Hay quas'),(8,'US_001','CH_015','2024-06-06 16:04:10.199000','lazada'),(9,'US_001','CH_016','2024-06-06 16:06:48.173000','hóng chương tiếp theo'),(10,'US_001','CH_015','2024-06-06 16:43:07.231000','Quas tuyets voi'),(11,'US_001','CH_015','2024-06-06 16:43:36.321000','hay qua di'),(12,'US_001','CH_016','2024-06-06 16:52:18.933000','truyen hay qua'),(13,'US_001','CH_016','2024-06-06 16:55:58.735000','10 diem khong co nhung'),(14,'US_001','CH_016','2024-06-06 16:57:52.834000','amazing gut chop'),(15,'US_001','CH_016','2024-06-06 17:09:01.911000','mlem mlem'),(16,'US_001','CH_016','2024-06-06 17:12:31.003000','tam duoc'),(17,'US_001','CH_016','2024-06-06 19:02:29.899000','tuyet cu meo'),(18,'US_001','CH_016','2024-06-06 19:02:54.852000','ow ke'),(19,'US_001','CH_016','2024-06-06 19:03:07.737000','hay qua di'),(20,'US_001','CH_015','2024-06-06 20:09:28.792000','a'),(21,'US_001','CH_015','2024-06-06 20:53:53.111000','b'),(22,'US_001','CH_016','2024-06-07 04:56:14.009000','đỉnh vậy'),(23,'US_001','CH_015','2024-06-07 09:54:00.301000','comment moi'),(24,'US_001','CH_016','2024-06-07 09:57:48.638000','binh luan tai day'),(25,'US_002','CH_015','2024-06-07 09:58:37.693000','ncc'),(26,'US_001','CH_016','2024-06-07 09:59:08.289000','perfect'),(27,'US_001','CH_016','2024-06-07 10:03:31.442000','cai deo gi day'),(28,'US_001','CH_016','2024-06-07 10:04:22.111000','what the hell man'),(29,'US_002','CH_016','2024-06-07 10:13:25.800000','duma '),(30,'US_001','CH_015','2024-06-07 10:14:56.819000','fuck'),(31,'US_001','CH_016','2024-06-07 10:33:50.778000','adu'),(32,'US_001','CH_017','2024-06-07 10:43:36.247000','cut bo'),(33,'US_001','CH_018','2024-06-07 10:44:20.551000','hhhh'),(34,'US_001','CH_016','2024-06-12 08:49:32.545000','hahaha'),(35,'US_001','CH_017','2024-06-18 02:52:11.882000','hihi'),(36,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 02:56:34.143000','Hay quá'),(37,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 04:22:39.292000','oh my god'),(38,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 04:24:41.415000','aaa'),(39,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 04:27:26.732000','qua hay'),(40,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 04:27:38.641000','tuyet voi'),(41,'724d6e51-ea64-4','809f0d31-d2e0-4','2024-06-18 06:53:27.976000','h'),(42,'724d6e51-ea64-4','73d14817-ed83-4','2024-06-18 06:58:18.563000','aa'),(43,'724d6e51-ea64-4','CH_018','2024-06-21 11:18:35.117000','aa'),(44,'724d6e51-ea64-4','CH_018','2024-06-21 11:18:38.277000','aaa'),(45,'724d6e51-ea64-4','CH_018','2024-06-21 11:18:41.748000','aaaa'),(46,'US_001','CH_017','2024-06-26 15:14:46.645000','kkk'),(47,'c4866bd6-5db7-4','CH_017','2024-07-06 11:13:17.857000','hay qua'),(48,'c4866bd6-5db7-4','08dccd38-4c1a-4','2024-07-06 16:51:46.372000','dd'),(49,'c4866bd6-5db7-4','CH_018','2024-07-06 17:50:49.323000','hy\n'),(50,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:09.042000','aa'),(51,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:12.432000','adjdj'),(52,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:15.974000','dhhjs'),(53,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:28.242000','shhs\n');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donate`
--

DROP TABLE IF EXISTS `donate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `donate` (
  `id` varchar(30) NOT NULL,
  `donater_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `message` text,
  `amount` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `fk_donate_donater` (`donater_id`),
  KEY `fk_donate_receiver` (`receiver_id`),
  CONSTRAINT `fk_donate_donater` FOREIGN KEY (`donater_id`) REFERENCES `wallets` (`id`),
  CONSTRAINT `fk_donate_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `wallets` (`id`),
  CONSTRAINT `donate_chk_1` CHECK ((`amount` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donate`
--

LOCK TABLES `donate` WRITE;
/*!40000 ALTER TABLE `donate` DISABLE KEYS */;
INSERT INTO `donate` VALUES ('0833c9c3-9211-4',1,2,'Le Dinh Bao donated to Lai Van Quy','rtyuio',5445,'2024-06-12 09:38:15.546000'),('1e4424ef-5406-4',2,1,'Lai Van Quy donated to Le Dinh Bao','122',100000,'2024-06-05 18:55:22.956000'),('24edd3a7-e1e8-4',1,2,'Le Dinh Bao donated to Lai Van Quy','chao cau',9999,'2024-06-12 09:36:44.513000'),('2ba81471-4582-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Lvq0612@a',100000,'2024-06-05 18:37:42.771000'),('4630a3cc-6e2b-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi',100000,'2024-06-05 18:49:21.667000'),('5baf9849-8d75-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Lvq chuyen tien',111111,'2024-06-12 09:32:39.546000'),('699c66bf-0d35-4',1,2,'Le Dinh Bao donated to Lai Van Quy','From mixi with love',123123,'2024-06-12 07:43:18.859000'),('6ec316ed-4d78-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi',10000,'2024-06-21 17:44:49.339000'),('72220779-aeb0-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi2',100000,'2024-06-05 18:51:17.951000'),('7281cc82-75e8-4',2,1,'Lai Van Quy donated to Le Dinh Bao','yeye',1234,'2024-06-07 05:35:09.398000'),('851d6d47-24e3-4',1,2,'Le Dinh Bao donated to Lai Van Quy','hihi',123321,'2024-06-12 09:30:32.760000'),('8c41e975-393a-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Em fan anh',1000,'2023-12-25 16:49:09.204000'),('9daf961e-f0b1-4',2,1,'Lai Van Quy donated to Le Dinh Bao','1211',1111,'2024-06-05 18:58:19.330000'),('a7eaee9a-07b3-4',1,2,'Le Dinh Bao donated to Lai Van Quy','ajaha',11221,'2024-06-12 09:38:52.385000'),('abfc1e48-777e-4',2,1,'Lai Van Quy donated to Le Dinh Bao','qua tuyet voi',10000,'2024-05-16 06:36:32.652000'),('adfafd09-6c70-4',3,2,'Laviem donated to Lai Van Quy','Lvq chuyen tien',10000,'2024-06-21 06:46:30.812000'),('cc33d419-03f7-4',1,2,'Le Dinh Bao donated to Lai Van Quy','chao abn',6666,'2024-06-12 09:37:23.382000'),('d4d8705e-d3f3-4',2,1,'Lai Van Quy donated to Le Dinh Bao','abvgyw',1111,'2024-06-05 19:00:20.302000'),('dafb4aa9-e113-4',1,2,'Le Dinh Bao donated to Lai Van Quy','fhgg',13313,'2024-06-12 09:39:15.590000'),('fe1ae675-b24e-4',1,2,'Le Dinh Bao donated to Lai Van Quy','hi anh',10000,'2024-06-21 17:35:39.454000');
/*!40000 ALTER TABLE `donate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite_comic`
--

DROP TABLE IF EXISTS `favorite_comic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `favorite_comic` (
  `user_id` varchar(20) NOT NULL,
  `comic_id` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`,`comic_id`),
  KEY `fk_favorite_comic_commicbooks` (`comic_id`),
  CONSTRAINT `fk_favorite_comic_commicbooks` FOREIGN KEY (`comic_id`) REFERENCES `comicbooks` (`id`),
  CONSTRAINT `fk_favorite_comic_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite_comic`
--

LOCK TABLES `favorite_comic` WRITE;
/*!40000 ALTER TABLE `favorite_comic` DISABLE KEYS */;
INSERT INTO `favorite_comic` VALUES ('US_002','11543b38-d56b-4'),('US_001','B_001'),('US_001','B_015'),('US_002','B_022'),('US_001','B_024');
/*!40000 ALTER TABLE `favorite_comic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `follow` (
  `follower_id` varchar(20) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`follower_id`,`user_id`),
  KEY `fk_follow_user` (`user_id`),
  CONSTRAINT `fk_follow_follower` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_follow_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('US_001','724d6e51-ea64-4'),('724d6e51-ea64-4','US_001'),('c4866bd6-5db7-4','US_001'),('US_002','US_001'),('724d6e51-ea64-4','US_002'),('US_001','US_002');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `genres` (
  `id` varchar(20) NOT NULL,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES ('GR_05','Cuộc sống'),('GR_07','Giật gân'),('GR_03','Hài hước'),('GR_02','Hành động'),('GR_06','Khoa học viễn tưởng'),('GR_10','Kinh dị'),('GR_09','Lịch sử'),('GR_01','Ngôn tình'),('GR_04','Siêu anh hùng'),('GR_08','Thể thao');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_increase_view`
--

DROP TABLE IF EXISTS `history_increase_view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `history_increase_view` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comic_id` varchar(20) NOT NULL,
  `date_increase` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comic_id` (`comic_id`),
  CONSTRAINT `history_increase_view_ibfk_1` FOREIGN KEY (`comic_id`) REFERENCES `comicbooks` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_increase_view`
--

LOCK TABLES `history_increase_view` WRITE;
/*!40000 ALTER TABLE `history_increase_view` DISABLE KEYS */;
INSERT INTO `history_increase_view` VALUES (172,'B_005','2024-06-15'),(173,'B_022','2024-06-15'),(174,'B_025','2024-06-15'),(175,'B_025','2024-06-15'),(176,'B_025','2024-06-15'),(177,'B_025','2024-06-15'),(178,'B_025','2024-06-15'),(179,'B_025','2024-06-15'),(180,'B_025','2024-06-15'),(181,'B_025','2024-06-15'),(182,'B_025','2024-06-15'),(183,'B_025','2024-06-15'),(184,'B_025','2024-06-15'),(185,'B_025','2024-06-15'),(186,'B_005','2024-06-15'),(187,'B_005','2024-06-15'),(188,'B_005','2024-06-15'),(189,'B_005','2024-06-15'),(190,'B_005','2024-06-15'),(191,'B_005','2024-06-15'),(192,'B_005','2024-06-15'),(193,'B_005','2024-06-15'),(194,'B_025','2024-06-15'),(195,'B_025','2024-06-15'),(196,'B_025','2024-06-15'),(197,'B_025','2024-06-15'),(198,'B_025','2024-06-15'),(199,'B_025','2024-06-15'),(200,'B_025','2024-06-15'),(201,'B_025','2024-06-15'),(202,'B_025','2024-06-15'),(203,'B_025','2024-06-15'),(204,'B_025','2024-06-15'),(205,'B_025','2024-06-15'),(206,'B_025','2024-06-15'),(207,'B_001','2024-06-15'),(208,'B_001','2024-06-15'),(209,'B_001','2024-06-15'),(210,'B_001','2024-06-15'),(211,'B_001','2024-06-15'),(212,'B_001','2024-06-15'),(213,'B_001','2024-06-15'),(214,'B_001','2024-06-15'),(215,'B_001','2024-06-15'),(216,'B_001','2024-06-15'),(217,'B_001','2024-06-15'),(218,'B_001','2024-06-15'),(219,'B_001','2024-06-15'),(220,'B_001','2024-06-15'),(221,'B_001','2024-06-15'),(222,'B_015','2024-06-17'),(223,'B_001','2024-06-17'),(224,'B_013','2024-06-17'),(225,'B_022','2024-06-18'),(226,'B_022','2024-06-18'),(227,'B_022','2024-06-18'),(228,'B_005','2024-06-18'),(229,'B_001','2024-06-18'),(230,'B_005','2024-06-18'),(231,'B_005','2024-06-18'),(232,'B_015','2024-06-18'),(233,'B_005','2024-06-18'),(234,'B_005','2024-06-18'),(235,'B_001','2024-06-18'),(236,'B_001','2024-06-18'),(237,'B_011','2024-06-18'),(238,'B_005','2024-06-18'),(239,'B_027','2024-06-18'),(240,'2421bff1-fb11-4','2024-06-18'),(241,'11543b38-d56b-4','2024-06-18'),(242,'B_015','2024-06-18'),(243,'B_009','2024-06-20'),(244,'B_001','2024-06-20'),(245,'B_005','2024-06-20'),(246,'B_009','2024-06-20'),(247,'B_015','2024-06-20'),(248,'B_022','2024-06-21'),(249,'B_023','2024-06-21'),(250,'f5f5c864-cb44-4','2024-06-21'),(251,'B_015','2024-06-21'),(252,'B_015','2024-06-21'),(253,'B_009','2024-06-21'),(254,'B_022','2024-06-22'),(255,'B_025','2024-06-22'),(256,'B_022','2024-06-22'),(257,'B_015','2024-06-23'),(258,'B_015','2024-06-24'),(259,'B_009','2024-06-24'),(260,'B_022','2024-06-24'),(261,'B_005','2024-06-24'),(262,'B_015','2024-06-24'),(263,'11543b38-d56b-4','2024-06-24'),(264,'2421bff1-fb11-4','2024-06-24'),(265,'2421bff1-fb11-4','2024-06-25'),(266,'11543b38-d56b-4','2024-06-25'),(267,'2421bff1-fb11-4','2024-06-26'),(268,'B_022','2024-06-26'),(269,'B_009','2024-06-26'),(270,'B_022','2024-06-26'),(271,'B_009','2024-07-02'),(272,'B_009','2024-07-04'),(273,'B_015','2024-07-04'),(274,'B_018','2024-07-04'),(275,'B_020','2024-07-04'),(276,'B_017','2024-07-04'),(277,'B_010','2024-07-04'),(278,'B_021','2024-07-04'),(279,'B_009','2024-07-04'),(280,'B_009','2024-07-04'),(281,'B_009','2024-07-04'),(282,'B_005','2024-07-04'),(283,'B_009','2024-07-06'),(284,'B_009','2024-07-06'),(285,'B_009','2024-07-07'),(286,'0bf99505-463a-4','2024-07-07'),(287,'B_010','2024-07-08'),(288,'B_010','2024-07-08'),(289,'B_010','2024-07-08'),(290,'B_020','2024-07-08'),(291,'B_022','2024-07-08'),(292,'B_016','2024-07-08'),(293,'B_029','2024-07-08'),(294,'B_024','2024-07-08'),(295,'B_007','2024-07-08'),(296,'B_010','2024-07-08'),(297,'B_024','2024-07-08'),(298,'B_010','2024-07-08'),(299,'B_010','2024-07-08'),(300,'B_009','2024-07-08'),(301,'B_009','2024-07-08'),(302,'B_010','2024-07-08'),(303,'B_010','2024-07-08'),(304,'B_009','2024-07-08'),(305,'B_024','2024-07-08'),(306,'B_010','2024-07-08'),(307,'B_009','2024-07-09'),(308,'B_010','2024-07-09'),(309,'B_009','2024-07-09'),(310,'B_009','2024-07-09'),(311,'B_010','2024-07-09'),(312,'B_010','2024-07-09'),(313,'B_025','2024-07-09'),(314,'B_010','2024-07-09'),(315,'B_026','2024-07-09'),(316,'B_025','2024-07-09'),(317,'B_012','2024-07-09'),(318,'B_007','2024-07-09'),(319,'B_019','2024-07-09'),(320,'B_028','2024-07-09'),(321,'B_007','2024-07-09'),(322,'B_010','2024-07-09'),(323,'B_009','2024-07-09'),(324,'f5f5c864-cb44-4','2024-07-09'),(325,'B_005','2024-07-09'),(326,'B_009','2024-07-09'),(327,'B_008','2024-07-09'),(328,'B_001','2024-07-09'),(329,'B_008','2024-07-09'),(330,'B_024','2024-07-09'),(331,'B_009','2024-07-10'),(332,'B_005','2024-07-10'),(333,'B_005','2024-07-10');
/*!40000 ALTER TABLE `history_increase_view` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history_reading`
--

DROP TABLE IF EXISTS `history_reading`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `history_reading` (
  `user_id` varchar(20) NOT NULL,
  `chapter_id` varchar(20) NOT NULL,
  `reading_time` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`user_id`,`chapter_id`),
  KEY `chapter_id` (`chapter_id`),
  CONSTRAINT `history_reading_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `history_reading_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_reading`
--

LOCK TABLES `history_reading` WRITE;
/*!40000 ALTER TABLE `history_reading` DISABLE KEYS */;
INSERT INTO `history_reading` VALUES ('724d6e51-ea64-4','3d09e0f9-c547-4','2024-07-08 08:57:36.770000'),('724d6e51-ea64-4','5ef4c45c-ed8e-4','2024-07-08 08:57:32.249000'),('724d6e51-ea64-4','73d14817-ed83-4','2024-07-08 08:44:50.817000'),('724d6e51-ea64-4','809f0d31-d2e0-4','2024-07-08 08:58:07.115000'),('724d6e51-ea64-4','bf690467-165d-4','2024-07-08 08:58:20.064000'),('724d6e51-ea64-4','ce0ae7bb-abda-4','2024-07-08 08:57:39.400000'),('724d6e51-ea64-4','CH_001','2024-07-08 09:42:21.010000'),('724d6e51-ea64-4','CH_002','2024-07-08 09:27:05.383000'),('724d6e51-ea64-4','CH_009','2024-07-08 08:58:22.495000'),('724d6e51-ea64-4','CH_010','2024-07-08 08:57:55.320000'),('724d6e51-ea64-4','CH_013','2024-07-08 09:21:00.977000'),('724d6e51-ea64-4','CH_017','2024-07-09 04:25:59.970000'),('724d6e51-ea64-4','CH_018','2024-07-08 10:15:02.679000'),('724d6e51-ea64-4','CH_019','2024-07-09 04:20:57.652000'),('724d6e51-ea64-4','CH_020','2024-07-08 11:37:45.779000'),('724d6e51-ea64-4','e36a0184-bfeb-4','2024-07-08 08:58:13.698000'),('724d6e51-ea64-4','ea794a69-0843-4','2024-07-08 08:57:56.908000'),('724d6e51-ea64-4','f3b0f5c4-4724-4','2024-07-08 08:58:12.852000'),('c4866bd6-5db7-4','CH_017','2024-07-06 11:13:11.059000'),('c4866bd6-5db7-4','CH_018','2024-07-06 17:50:41.602000'),('US_001','3d09e0f9-c547-4','2024-06-15 10:00:24.120000'),('US_001','6bbde778-31df-4','2024-07-04 02:57:11.307000'),('US_001','73d14817-ed83-4','2024-07-10 05:05:21.350000'),('US_001','809f0d31-d2e0-4','2024-06-09 13:10:51.722000'),('US_001','b23b3ae2-517e-4','2024-06-17 08:40:36.520000'),('US_001','bf690467-165d-4','2024-06-15 09:18:55.777000'),('US_001','c2da57c8-0f03-4','2024-07-09 18:14:45.813000'),('US_001','ce0ae7bb-abda-4','2024-07-09 18:15:01.498000'),('US_001','cfeb04ec-adce-4','2024-07-09 18:14:56.474000'),('US_001','CH_001','2024-06-09 13:03:08.897000'),('US_001','CH_009','2024-07-09 18:15:04.066000'),('US_001','CH_010','2024-07-09 18:14:55.006000'),('US_001','CH_013','2024-07-09 06:57:33.073000'),('US_001','CH_014','2024-07-09 06:57:35.623000'),('US_001','CH_015','2024-06-07 10:42:47.756000'),('US_001','CH_016','2024-06-12 08:49:19.718000'),('US_001','CH_017','2024-07-09 18:14:25.199000'),('US_001','CH_018','2024-06-17 09:43:52.512000'),('US_001','CH_019','2024-07-09 06:56:35.677000'),('US_001','CH_020','2024-07-09 06:56:39.730000'),('US_001','dce80b76-2445-4','2024-07-09 18:15:07.556000'),('US_001','e36a0184-bfeb-4','2024-06-17 08:39:40.962000'),('US_001','ea794a69-0843-4','2024-07-09 18:14:59.085000'),('US_001','f3b0f5c4-4724-4','2024-07-09 18:14:52.134000'),('US_002','3d2fa003-905d-4','2024-06-19 08:13:16.552000'),('US_002','ccc6dbb5-0a12-4','2024-06-19 11:33:20.478000'),('US_002','CH_001','2023-12-26 15:09:30.959000'),('US_002','CH_015','2024-06-07 09:58:30.193000'),('US_002','CH_016','2024-06-08 09:33:37.753000'),('US_002','CH_017','2024-06-07 10:46:28.679000');
/*!40000 ALTER TABLE `history_reading` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `images` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chapter_id` varchar(20) NOT NULL,
  `link` varchar(200) NOT NULL,
  `ordinal_number` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_images_chapters` (`chapter_id`),
  CONSTRAINT `fk_images_chapters` FOREIGN KEY (`chapter_id`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=608 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'CH_001','sgdyshdgsydgudgwygwugw.jpg',1),(2,'CH_001','dnsjdhuehdwuhguwhehdeweiw.jpg',2),(3,'CH_001','wdbhwgwudbjwgdugduwehquqi.jpg',3),(4,'CH_001','qetywuiehweqijdsfgdija.jpg',4),(5,'CH_001','weyiwgrewuijedkhfdgfhheuhdnshfg.jpg',5),(6,'CH_001','yuewhwigruekjsdbhgdxcbvchdjgfbsg.jpg',6),(7,'CH_001','ddtwygewygeuwiejdhfbdbfesdwi.jpg',7),(8,'CH_001','qewwhjireuruidjskgfbdjfbisdk.jpg',8),(9,'CH_001','fdfnweurhiwukhfeyfhbejfhj.jpg',9),(10,'CH_001','sdiuwfbcmndksneqiuw.jpg',10),(11,'CH_001','sgdhsdeusidjsjfudhdgx.jpg',11),(12,'CH_001','aehqiweiwureygfbvcnvbdh.jpg',12),(13,'CH_002','poiuytfgwshjnwndbscvgxh.jpg',1),(14,'CH_002','bvujdnfwdsdgwhdksjbf.jpg',2),(15,'CH_002','eyrujetgfdbfdjhnsfvedn.jpg',3),(16,'CH_002','yreiotrtruhdfb xvfwhjshna.jpg',4),(17,'CH_002','tyryteifjnvjdnvudhf.jpg',5),(18,'CH_002','qwhteyuiotkrmg vcnxvcbxj.jpg',6),(19,'CH_002','wetyuirotgkfvdgxcvb.jpg',7),(48,'CH_007','wtyuieorrueilrhewiuriwjrei.jpg',1),(49,'CH_007','ghdwdhjwmdvjsfhnjehdn.jpg',2),(50,'CH_007','iouwlekmwnjdghjsnmcb.jpg',3),(51,'CH_007','oiuywtyuiekdjjfhsgh.jpg',4),(52,'CH_007','wuwygeuwjdkhejdb.jpg',5),(53,'CH_007','vbjshvdjwhdwjkwiks.jpg',6),(54,'CH_007','poiuytghdnsbdvshdwjks.jpg',7),(55,'CH_008','ryeuiwokwjdshfnjhdnedsk.jpg',1),(56,'CH_008','mhdgsudhwudhiw.jpg',2),(57,'CH_008','kjhghshdwuduwkj.jpg',3),(58,'CH_008','ncdncuhdiwdjwhdwuh.jpg',4),(59,'CH_008','kjsihdwidjwpdwdeudjwu.jpg',5),(60,'CH_008','ndjbdwhdwguqwhw.jpg',6),(61,'CH_008','ihywhewygdhddvbmdjn.jpg',7),(69,'CH_010','dnjedbeukjdnefbc.jpg',1),(70,'CH_010','cbhduwkjnqwjs.jpg',2),(71,'CH_010','zxfgavshwhdwksj.jpg',3),(72,'CH_010','xvgsvhsiqjswhdwu.jpg',4),(73,'CH_010','mcvhsjdwhgsua.jpg',5),(74,'CH_010','mchdghwjgwusaj.jpg',6),(75,'CH_010','tyirfbhefdgeujrenfrb.jpg',7),(90,'CH_013','sdhjdnejdhsnkjdm.jpg',1),(91,'CH_013','luyijakjsgwhukdhuyd.jpg',2),(92,'CH_013','3456782uhewy6ywushj.jpg',3),(93,'CH_013','8765rytghjsbhfdghjs.jpg',4),(94,'CH_013','987uhshggwhjndsdhj.jpg',5),(95,'CH_013','45tyghbvy6utwyuh.jpg',6),(96,'CH_013','7667uhbsghgh.jpg',7),(97,'CH_014','djncehjsdnwskhdjwdsuj.jpg',1),(98,'CH_014','072uwhdbshdbshb.jpg',2),(99,'CH_014','176277ehdsdbjhbcsx.jpg',3),(100,'CH_014','98765425678u3ejdsdsghbn.jpg',4),(101,'CH_014','6hgdsd78uwewu.jpg',5),(102,'CH_014','3647854redytfgdbfegjhs.jpg',6),(103,'CH_014','orr47ru83ieuhdyhs.jpg',7),(104,'CH_015','hdjhsndjsdnsdhbnhn.jpg',1),(105,'CH_015','92883746yreujdbfejhdsn.jpg',2),(106,'CH_015','56787ushuwgshvdbsh.jpg',3),(107,'CH_015','28743yrhiufdfgh387.jpg',4),(108,'CH_015','bhdbcjhdnwknsdn.jpg',5),(109,'CH_015','ueiowekwdbkjsnc.jpg',6),(110,'CH_015','hdjsndiwuijwjw8.jpg',7),(111,'CH_016','smsjhsjnjsabjk.jpg',1),(112,'CH_016','iuywtyusjedsbnjnx.jpg',2),(113,'CH_016','287wtyhssddgyshjn.jpg',3),(114,'CH_016','gcydhwd78u2oueidhs.jpg',4),(115,'CH_016','dgdvbsdbws82728.jpg',5),(116,'CH_016','cvbnsgdwytyswdgw8.jpg',6),(117,'CH_016','vbrufgh3874283urhd.jpg',7),(118,'CH_017','wgjdhnedgehujsdwius.jpg',1),(119,'CH_017','82787uewhdedn.jpg',2),(120,'CH_017','cbdhwyduqwdugsuh.jpg',3),(121,'CH_017','e7h3yegdheygh3iuh.jpg',4),(122,'CH_017','6e74eyurhfrdfy3uehjds.jpg',5),(123,'CH_017','bhcbdwudjwoidjnsj.jpg',6),(124,'CH_017','67438eruhfrsdfghwsdj.jpg',7),(125,'CH_018','cdsjbwyushjnahbsjdknsx.jpg',1),(126,'CH_018','gehdksyudhnwujdnwui8.jpg',2),(127,'CH_018','iurhegejhfbsjbu7yu.jpg',3),(128,'CH_018','eg37te783ue2iheidu.jpg',4),(129,'CH_018','84974et6yiudjheyfdhsjdgyhj.jpg',5),(130,'CH_018','390874e56ytgdhsbvdgh.jpg',6),(131,'CH_018','9876twydhsdghsedhn.jpg',7),(132,'CH_019','siuweu3iu38edij.jpg',1),(133,'CH_019','467eryduhnjfyeujdksm.jpg',2),(134,'CH_019','39876ey3uidsgdbuhjsdbnwha.jpg',3),(135,'CH_019','478tr7euihbfrhdjmsjd.jpg',4),(136,'CH_019','cbhsjkdhwyuw8ui.jpg',5),(137,'CH_019','8374iurjehbdhgbsdgwyshj.jpg',6),(138,'CH_019','hdujnesdg7838uei288367.jpg',7),(139,'CH_020','sbdnwkhwdhbesjdbj.jpg',1),(140,'CH_020','rfedgyjioseur4hy7548eih.jpg',2),(141,'CH_020','4634uejbdghsdhwasjm.jpg',3),(142,'CH_020','mnshashgw7wuoi2wjq.jpg',4),(143,'CH_020','ncbsuydgwusyqiuw28wu78.jpg',5),(144,'CH_020','78832uehwdshdn.jpg',6),(145,'CH_020','3436576teyhjdsdbyegsb.jpg',7),(229,'809f0d31-d2e0-4','cc7eee7e80094e1d85ebaffe8b34c730.jpg',1),(230,'809f0d31-d2e0-4','755ac496abf845bf911e75c2d6b2968b.jpg',2),(231,'809f0d31-d2e0-4','8a20abb4429449a8a6a09ca4d85dd447.jpg',3),(232,'809f0d31-d2e0-4','244de45150494742aee2ee9e1262ea34.jpg',4),(243,'b23b3ae2-517e-4','dac6c89d567c4faf9f65d7ccbf190203.jpg',1),(244,'b23b3ae2-517e-4','e5c4979063a747028172883ca749ea3c.jpg',2),(245,'b23b3ae2-517e-4','dd66cda1891c40838fbec52ae76dbcc3.jpg',3),(246,'b23b3ae2-517e-4','b7503d81ed1a4eed92cce669673e8744.jpg',4),(247,'b23b3ae2-517e-4','764cccc4f46844e5be37bf3a76373e94.jpg',5),(254,'2a8f0e11-1add-4','52f2567221c44af9b32860e7388c058c.jpg',1),(255,'2a8f0e11-1add-4','29023826eb3449e8a419cda06d29c30d.jpg',2),(256,'2a8f0e11-1add-4','f2bf119dc3c44c88b280c13f00361db9.jpg',3),(257,'2a8f0e11-1add-4','ab6e9d4c421145c580d721f34445b1b2.jpg',4),(258,'2a8f0e11-1add-4','89a5459d9297410193b074febaad1cc8.jpg',5),(259,'2a8f0e11-1add-4','f70eb9f80f714f188229ccd005a23f0c.jpg',6),(260,'5ef4c45c-ed8e-4','98f87be1be9b481fa38bea9d08665f61.png',1),(261,'5ef4c45c-ed8e-4','5b70f812dbf34e8c8a96211309393b69.jpg',2),(262,'5ef4c45c-ed8e-4','ce41bb8934054f199212e523f28f8212.jpg',3),(263,'5ef4c45c-ed8e-4','9578503455e1441eb75bdf438617806e.jpg',4),(268,'3d09e0f9-c547-4','b35dd0bf1a9647c999a4c13cb3c05df6.jpg',1),(269,'3d09e0f9-c547-4','661a17bf4ab641de9faa85446cf50585.jpg',2),(270,'3d09e0f9-c547-4','77280d1364ec425a8dbe62b17b7641b1.jpg',3),(271,'3d09e0f9-c547-4','03981096e8084e73825104228f9da6da.jpg',4),(272,'3d09e0f9-c547-4','c247f60861c74d55a9f5c3254c29e3c7.png',5),(281,'f47727d0-8275-4','39a01de00ebc49528a6022589f709037.jpg',1),(282,'f47727d0-8275-4','19b51493a036450f8d340c4ab596acb1.jpg',2),(283,'f47727d0-8275-4','aa8bebdc2ac4468e90664e6cff676f77.jpg',3),(284,'f47727d0-8275-4','bca7bb0e08ef417c82d895568a4b5820.png',4),(285,'73d14817-ed83-4','1dac645c7f5b4e46895eb4efa2fa8136.png',1),(286,'73d14817-ed83-4','95eade9451a743cd9b4e0e379a571e0e.jpg',2),(287,'73d14817-ed83-4','8aa0c7c12b1142d68e6051096792ae2e.jpg',3),(288,'f3b0f5c4-4724-4','2028e65aee0a4462bdf22aedb8623acf.jpg',1),(289,'f3b0f5c4-4724-4','bff1d17a56fb42db952f757be9dc1bfa.jpg',2),(290,'f3b0f5c4-4724-4','b35c4fd093b14fbbb1264b05b846a977.jpg',3),(291,'f3b0f5c4-4724-4','4c0e638ecbcf40159130a34669482708.jpg',4),(292,'f3b0f5c4-4724-4','190b3b37891846b1b23699b0ee6802ad.jpg',5),(293,'f3b0f5c4-4724-4','a8b2fc3c38d5435aa6ed5b0366b870cd.jpg',6),(306,'bf690467-165d-4','c4d18a607d3e416ea24503c62dfe1bb1.jpg',1),(307,'bf690467-165d-4','57db38336cdb48a8b52a19eb5ca7005a.jpg',2),(310,'ce0ae7bb-abda-4','483a6c1e80b24b0c9724c7f93a36de82.jpg',1),(311,'ce0ae7bb-abda-4','ced3a7579db74b0cb1a3fbfa9f606652.png',2),(312,'ce0ae7bb-abda-4','0ff40ad3c05c4fd88d8d06b519a10eb2.jpg',3),(321,'3d2fa003-905d-4','df358773e1bd4eb5be7f7612f4794868.jpg',1),(322,'3d2fa003-905d-4','350590ea073a46c1ad57bc6ee5aff20e.jpg',2),(323,'3d2fa003-905d-4','ae31a692944f4fcd9f5c70fe3b8d9f32.jpg',3),(326,'c8faeaa8-0fd2-4','491e161bd5ac4d72896a0cf35a61c3f7.png',1),(327,'c8faeaa8-0fd2-4','69e73735b1fa46bd873d666f47509481.jpg',2),(328,'cf54a49d-f618-4','0cbedf5f4909405fb4697523536bee57.jpg',1),(329,'cf54a49d-f618-4','8630c44d43674dfdbb9de4a1be13739d.jpg',2),(330,'cf54a49d-f618-4','0f4363efc2d645c5b2a244308d084909.png',3),(331,'ccc6dbb5-0a12-4','aafe92347e364f91b3d94551b55261b4.jpg',1),(332,'ccc6dbb5-0a12-4','dda3fae55d3a4fafa9d48826d9d147c1.jpg',2),(333,'6bbde778-31df-4','1e2735e0ad414ac0968cfbcd8beb3788.jpg',1),(334,'6bbde778-31df-4','d7c7ddae23ed478e835999a2d1928d35.png',2),(335,'6bbde778-31df-4','c22b4d8024c5489883f8c78497afb7db.jpg',3),(336,'ea794a69-0843-4','60a97c37b517427f85786b65429a5e48.jpg',1),(337,'ea794a69-0843-4','0805ca5c128641eb9cd0785574951c7f.jpg',2),(338,'775dd348-8396-4','88e45bd17a724dc7a8aa0915e4c03188.jpg',1),(339,'775dd348-8396-4','69250572cd2c441a9c0c6ff0ce25045d.jpg',2),(340,'775dd348-8396-4','7eeea589990a42c99a56b17acb09f212.png',3),(341,'775dd348-8396-4','da6a42d1686b4e7fb32f2b065cf63f95.jpg',4),(342,'08dccd38-4c1a-4','07a36ef5cff541699a68619bb954e3d6.jpg',1),(343,'08dccd38-4c1a-4','19025245606047dd92c4302b85fc5a88.jpg',2),(344,'08dccd38-4c1a-4','8debe003e11246b9b540aecd6785f93d.jpg',3),(345,'08dccd38-4c1a-4','709ea9f441404cbdb9ffbf7e8df7fe43.jpg',4),(346,'dce80b76-2445-4','299ab2af1e874d55b385c84a1ebd56bd.jpg',1),(347,'dce80b76-2445-4','db77425792f64a4a9b844b94d0062cb9.jpg',2),(348,'3e731ad5-107a-4','ceaeca5cd4ad4f7b8d5f9d30f48da256.jpg',1),(349,'3e731ad5-107a-4','d4e142d1cfa0409a8c34e46f5d7a7e47.jpg',2),(350,'c58bcc7c-bf89-4','c16987bd4eac43d4be2c7e21bf4566df.jpg',1),(351,'c58bcc7c-bf89-4','4b4b73cc2f2e415fb4a87158fabfcdd2.jpg',2),(352,'a462f297-ebe6-4','66613ccd17534488bec4866ea4d0e91d.jpg',1),(353,'a462f297-ebe6-4','e8b1f2e523f54044bbe71de64fb33775.jpg',2),(354,'a462f297-ebe6-4','ee048521c9f34fc785ac290ff647e488.jpg',3),(355,'a462f297-ebe6-4','2068d417106548909d5a74c58b8e37d4.jpg',4),(356,'3be0a0c3-a9e2-4','5e0c82494073419b96371e7817a6dd06.jpg',1),(357,'3be0a0c3-a9e2-4','921b6337d3d14e51819ffa584bac1b0f.jpg',2),(358,'6f1b49ed-e72a-4','4263b18ecb794b6488e739c3c8d2ec2d.jpg',1),(359,'6f1b49ed-e72a-4','fab1d90c5baf47bd99d9d02b89f4377d.jpg',2),(360,'a38ca8e3-e288-4','01d0cff868434dc48dea5358fc08f5cc.jpg',1),(361,'a38ca8e3-e288-4','a3ee6fc538b349358c5ae55a8673458e.jpg',2),(362,'f0ef5479-6288-4','a6b5ea01ea5c4bffaa3a24a4a383e3c8.jpg',1),(363,'f0ef5479-6288-4','fff45435727f462e8bf67d4e80235437.jpg',2),(364,'9dbddca1-e625-4','c5932863678645ba875e14f62a138354.jpg',1),(365,'a43f6218-0365-4','a069d908bb9f47f0ba15ec42ca43dc9d.jpg',1),(366,'e36a0184-bfeb-4','718fd48f85204f55b122349bf56ffa11.jpg',1),(367,'e36a0184-bfeb-4','efa023b37c9d4587939da3d1eadc07a7.jpg',2),(368,'e36a0184-bfeb-4','986dcd46a43f4220a811a7a7aa2d60c3.jpg',3),(541,'CH_009','a50c1e0b97004f1083414732bf44710b.jpg',1),(542,'CH_009','c1ef245a552e486e858557bff0bcb064.jpg',2),(543,'CH_009','92acf06267ba470da62b66bcfdfb3591.jpg',3),(544,'CH_009','2dcaf0a5e1824352905abdbcbd44ef68.jpg',4),(545,'CH_009','8c840196efab48cfa10c9d731ccccf7b.jpg',5),(546,'CH_009','79dd1f8f02964056be3a889fed09344b.jpg',6),(547,'CH_009','e810bd7610294f90b658c9e11cb162b8.jpg',7),(548,'2e54a8cc-ff7e-4','f18e0ba39e454911aee6b99664bb09ee.jpg',1),(549,'2e54a8cc-ff7e-4','5d886d741c62451f9de84bc33591c963.jpg',2),(550,'50c4b851-9133-4','c59134fd47a5412385fecd1697133396.jpg',1),(551,'50c4b851-9133-4','1058d5e58dfd4c1eabf3eb83adfac830.jpg',2),(552,'23a09857-b2d9-4','c6a235ae7a8b4598b4de061ef4b530d2.jpg',1),(553,'23a09857-b2d9-4','2b97addbf8a041b090dca8125a6f55c9.jpg',2),(554,'8017591d-e9d9-4','a88fbb0c2d974feaaaa3a21013de0a1c.jpg',1),(557,'9fae2309-b8d8-4','fbec1821ee8440c6ab491ea157c42dc3.jpg',1),(558,'9fae2309-b8d8-4','eccfec3483144abe8b69ba18425b32b1.jpg',2),(559,'fcc9dc5a-2a86-4','cb623430d9fb45b191c8802c00d88861.jpg',1),(592,'e823bf45-7724-4','fd0d36b05f10453cac0b3a315b16cbe3.jpg',1),(593,'e823bf45-7724-4','c8b1747f6d1b4657a3a9fa0a3af677d9.jpg',2),(594,'e823bf45-7724-4','253630553c00464caec56c71d45305a5.jpg',3),(595,'91e63687-ff2e-4','4ddf323b7bf14fc0a613e8c93dd0146a.jpg',1),(601,'4c286372-ee38-4','465a8145b1c649a3956e6ae4e4504be0.jpg',1),(602,'4c286372-ee38-4','3a263c3f6f414a108615b7347217e106.jpg',2),(603,'4c286372-ee38-4','21a187c2ace34c70b008c22dbaf97fa0.jpg',3),(607,'bc4e99ce-117b-4','9882731ab1b54bdeba96a0bebfe59e3a.jpg',1);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender` varchar(20) NOT NULL,
  `receiver` varchar(20) NOT NULL,
  `content` text,
  `time` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `isRead` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sender` (`sender`),
  KEY `receiver` (`receiver`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'US_001','US_002','e cu\n','2024-06-24 08:20:53.096000',1),(2,'US_002','US_001','gi may\n','2024-06-24 08:21:02.156000',1),(3,'US_002','US_001','ăn cứt không\n','2024-06-24 08:28:32.128000',1),(4,'US_001','US_002','đéo\n','2024-06-24 08:28:37.764000',1),(5,'US_002','US_001','djdh\n','2024-06-24 08:29:02.215000',1),(6,'US_002','US_001','đjjdd\n','2024-06-24 08:29:03.395000',1),(7,'US_002','US_001','hahhaha\n','2024-06-24 08:30:33.137000',1),(8,'US_001','US_002','hi\n','2024-06-24 08:34:33.333000',1),(9,'US_001','US_002','hello gy\n','2024-06-24 08:40:05.971000',1),(10,'US_001','US_002','jaja\n','2024-06-24 08:44:58.390000',1),(11,'US_001','US_002','dume\n','2024-06-24 08:45:03.834000',1),(12,'US_001','US_002','haha\n','2024-06-24 10:12:53.228000',1),(13,'US_002','US_001','ha cc\n','2024-06-24 10:14:38.048000',1),(14,'US_002','US_001','hdddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh\n','2024-06-24 10:23:34.265000',1),(15,'US_002','US_001','mot hai ba bon nam sau bay tam chin muoi muoi mot muoi hai muoi ba muoi bon muoi lam muoi sau\n','2024-06-24 10:24:19.161000',1),(16,'US_001','724d6e51-ea64-4','hay guy\n','2024-06-24 10:26:04.420000',1),(17,'US_001','724d6e51-ea64-4','e cu\n','2024-06-24 11:10:52.058000',1),(18,'724d6e51-ea64-4','US_001','ha\n','2024-06-24 11:11:06.285000',1),(19,'US_001','724d6e51-ea64-4','con cac\n','2024-06-24 11:15:43.503000',1),(20,'724d6e51-ea64-4','US_001','dit me may\n','2024-06-24 11:15:53.726000',1),(21,'US_001','724d6e51-ea64-4','haha\n','2024-06-24 11:21:01.791000',1),(22,'US_001','724d6e51-ea64-4','con chim\n','2024-06-24 11:25:15.325000',1),(23,'US_001','724d6e51-ea64-4','fume\n','2024-06-24 11:27:15.912000',1),(24,'US_001','724d6e51-ea64-4','hshs\n','2024-06-24 11:35:33.477000',1),(25,'US_001','724d6e51-ea64-4','hi\n','2024-06-24 12:31:38.687000',1),(26,'US_002','US_001','haha\n','2024-06-24 15:30:22.015000',1),(27,'US_001','US_002','ha cc\n','2024-06-24 15:32:40.596000',1),(28,'US_001','US_002','e cu\n','2024-06-24 15:35:10.218000',1),(29,'US_001','US_002','bhghghg\n','2024-06-24 15:43:22.603000',1),(30,'US_001','US_002','e cu\n','2024-06-24 15:45:25.137000',1),(31,'US_001','724d6e51-ea64-4','haha\n','2024-06-24 15:51:25.543000',1),(32,'US_001','724d6e51-ea64-4','hehe\n','2024-06-24 15:59:04.490000',1),(33,'US_001','724d6e51-ea64-4','hihi\n','2024-06-24 16:02:42.252000',1),(34,'US_001','724d6e51-ea64-4','dcm\n','2024-06-24 16:03:53.271000',1),(35,'US_001','724d6e51-ea64-4','haha\n','2024-06-24 16:07:13.193000',1),(36,'US_001','724d6e51-ea64-4','hihi\n','2024-06-24 16:10:41.742000',1),(37,'US_001','US_002','chao m\n','2024-06-24 17:23:36.074000',1),(38,'US_001','US_002','e cu\n','2024-06-24 17:24:03.526000',1),(39,'US_001','US_002','sjjss\n','2024-06-24 17:24:07.614000',1),(40,'US_002','US_001','jhh\n','2024-06-24 17:24:46.786000',1),(41,'US_001','US_002','hhh\n','2024-06-24 17:25:03.601000',1),(42,'US_002','US_001','kkk\n','2024-06-24 17:25:19.075000',1),(43,'US_001','US_002','haha\n','2024-06-24 17:43:28.374000',1),(44,'US_001','US_002','e cu\n','2024-06-24 17:46:36.207000',1),(45,'US_001','US_002','clma\n','2024-06-24 17:46:52.437000',1),(46,'US_002','US_001','gi m\n','2024-06-24 17:47:28.612000',1),(47,'US_002','US_001','haha\n','2024-06-24 17:50:28.250000',1),(48,'US_001','US_002','ha cc\n','2024-06-24 17:50:37.057000',1),(49,'US_002','US_001','adu\n','2024-06-24 17:50:45.649000',1),(50,'US_002','US_001','haha\n','2024-06-24 18:11:05.859000',1),(51,'US_001','US_002','ha con cac\n','2024-06-24 18:11:18.360000',1),(52,'US_002','US_001','thang nay lao\n','2024-06-24 18:11:27.167000',1),(53,'US_001','US_002','lao cai lomn\n','2024-06-24 18:11:40.257000',1),(54,'US_001','724d6e51-ea64-4','alibaba\n','2024-06-24 18:11:54.852000',1),(55,'US_001','US_002','dit me react\n','2024-06-24 18:13:01.152000',1),(56,'US_002','US_001','hahaha\n','2024-06-24 18:13:10.359000',1),(57,'US_002','US_001','dume\n','2024-06-24 18:13:29.221000',1),(58,'US_001','US_002','ma may\n','2024-06-24 18:13:36.593000',1),(59,'US_001','724d6e51-ea64-4','haha\n','2024-06-25 06:05:10.986000',1),(60,'US_001','724d6e51-ea64-4','kkk\n','2024-06-25 06:18:01.354000',1),(61,'US_001','724d6e51-ea64-4','haha\n','2024-06-25 06:18:52.853000',1),(62,'US_001','724d6e51-ea64-4','abcde\n','2024-06-25 06:19:10.658000',1),(63,'US_002','US_001','e cu\n','2024-06-25 08:16:47.774000',1),(64,'US_002','US_001','haha\n','2024-06-25 08:17:38.463000',1),(65,'US_002','US_001','dcm\n','2024-06-25 08:17:57.912000',1),(66,'US_001','724d6e51-ea64-4','hha\n','2024-06-25 08:31:20.944000',1),(67,'US_001','US_002','e cu\n','2024-06-25 08:31:53.824000',1),(68,'US_001','US_002','hay\n','2024-06-25 08:32:20.730000',1),(69,'US_001','US_002','hay cl chu hay\n','2024-06-25 08:32:36.008000',1),(70,'US_001','US_002','hay\n','2024-06-25 08:32:46.347000',1),(71,'US_001','US_002','cc\n','2024-06-25 08:40:45.875000',1),(72,'US_002','US_001','cl\n','2024-06-25 10:00:56.929000',1),(73,'US_002','US_001','e\n','2024-06-25 10:02:08.927000',1),(74,'US_001','US_002','e cu\n','2024-06-25 10:15:52.570000',1),(75,'US_001','US_002','hjr\n','2024-06-25 10:20:29.044000',1),(76,'US_002','US_001','haha\n','2024-06-25 10:21:36.905000',1),(77,'US_001','US_002','hey\n','2024-06-25 10:25:05.870000',1),(78,'US_002','US_001','get\n','2024-06-25 10:25:29.546000',1),(79,'US_002','US_001','e ci\n','2024-06-25 10:26:16.241000',1),(80,'US_001','US_002','ja\n','2024-06-25 10:26:25.034000',1),(81,'US_002','US_001','an cut kh\n','2024-06-25 10:26:30.357000',1),(82,'US_001','724d6e51-ea64-4','haha\n','2024-06-25 10:33:05.985000',1),(83,'US_002','724d6e51-ea64-4','heyy\n','2024-06-25 13:38:02.254000',1),(84,'US_002','US_001','e ci\n','2024-06-25 13:38:33.780000',1),(85,'US_001','724d6e51-ea64-4','hehe\n','2024-06-25 13:39:11.651000',1),(86,'US_002','US_001','bro\n','2024-06-25 13:39:29.615000',1),(87,'US_002','US_001','hey\n','2024-06-25 13:41:22.742000',1),(88,'US_001','US_002','ha\n','2024-06-25 13:41:25.921000',1),(89,'US_002','US_001','an cou kh\n','2024-06-25 13:41:34.431000',1),(90,'US_001','724d6e51-ea64-4','haha\n','2024-06-25 13:49:07.370000',1),(91,'US_002','US_001','e cu\n','2024-06-25 13:49:21.188000',1),(92,'US_002','724d6e51-ea64-4','haha\n','2024-06-25 13:49:37.435000',1),(93,'US_002','724d6e51-ea64-4','hehe\n','2024-06-25 13:49:43.668000',1),(94,'US_001','US_002','gi m\n','2024-06-25 13:50:09.165000',1),(95,'US_001','US_002','dcm\n','2024-06-25 13:50:27.928000',1),(96,'US_002','US_001','a\n','2024-06-25 13:50:52.232000',1),(97,'US_002','US_001','a\n','2024-06-25 13:50:59.706000',1),(98,'US_002','US_001','n\n','2024-06-25 13:51:01.744000',1),(99,'US_001','724d6e51-ea64-4','gey\n','2024-06-25 13:52:34.782000',1),(100,'US_002','US_001','bro\n','2024-06-25 13:52:55.816000',1),(101,'US_002','US_001','nr\n','2024-06-25 13:53:05.079000',1),(102,'US_002','US_001','cl\n','2024-06-25 13:53:16.700000',1),(103,'US_002','724d6e51-ea64-4','sss\n','2024-06-25 13:55:47.724000',1),(104,'US_002','US_001','ss\n','2024-06-25 13:55:57.965000',1),(105,'US_001','724d6e51-ea64-4','ahja\n','2024-06-25 13:56:23.733000',1),(106,'US_002','US_001','ss\n','2024-06-25 13:56:58.665000',1),(107,'US_002','724d6e51-ea64-4','con chom\n','2024-06-25 13:57:10.489000',1),(108,'US_001','724d6e51-ea64-4','con bo tot\n','2024-06-25 13:57:23.961000',1),(109,'US_001','724d6e51-ea64-4','con bo tot\n','2024-06-25 13:57:33.188000',1),(110,'US_001','US_002','con bo tot\n','2024-06-25 13:57:52.435000',1),(111,'US_001','724d6e51-ea64-4','kkk\n','2024-06-25 13:58:04.673000',1),(112,'US_002','US_001','vo cdb\n','2024-06-25 13:58:12.736000',1),(113,'US_002','US_001','helli\n','2024-06-25 14:05:24.830000',1),(114,'US_002','US_001','aa\n','2024-06-25 14:06:18.174000',1),(115,'US_001','724d6e51-ea64-4','e\n','2024-06-25 14:06:44.621000',1),(116,'US_002','US_001','a\n','2024-06-25 14:06:56.730000',1),(117,'US_001','724d6e51-ea64-4','e\n','2024-06-25 14:45:06.739000',1),(118,'US_002','US_001','eee\n','2024-06-25 14:45:29.232000',1),(119,'US_001','US_002','kk\n','2024-06-25 14:52:08.135000',1),(120,'US_001','724d6e51-ea64-4','haha\n','2024-06-25 14:52:14.666000',1),(121,'US_001','US_002','kk\n','2024-06-25 14:52:36.143000',1),(122,'US_001','724d6e51-ea64-4','hah\n','2024-06-25 17:58:33.274000',1),(123,'US_002','US_001','e cu\n','2024-06-25 17:58:41.685000',1),(124,'US_002','US_001','duma\n','2024-06-25 17:58:50.262000',1),(125,'US_002','US_001','dit me may\n','2024-06-25 17:58:56.269000',1),(126,'US_001','US_002','gi z ba\n','2024-06-25 17:59:25.279000',1),(127,'US_001','US_002','hahaha\n','2024-06-25 17:59:30.823000',1),(128,'US_002','US_001','adu\n','2024-06-25 17:59:52.604000',1),(129,'US_001','US_002','haha\n','2024-06-25 18:03:44.671000',1),(130,'US_001','US_002','gi\n','2024-06-25 18:03:56.504000',1),(131,'US_001','US_002','kkk\n','2024-06-25 18:04:27.395000',1),(132,'US_001','US_002','lll\n','2024-06-25 18:05:00.494000',1),(133,'US_002','US_001','hey bro\n','2024-06-25 18:05:12.971000',1),(134,'US_001','724d6e51-ea64-4','me\n','2024-06-25 18:05:21.943000',1),(135,'US_002','US_001','lll\n','2024-06-25 18:05:31.065000',1),(136,'US_002','US_001','ban oi\n','2024-06-25 18:32:36.926000',1),(137,'US_001','US_002','gi ha ban\n','2024-06-25 18:32:54.893000',1),(138,'US_001','US_002','an cut khong\n','2024-06-25 18:33:21.368000',1),(139,'US_002','US_001','khong nhe\n','2024-06-25 18:33:32.237000',1),(140,'US_001','US_002','haha\n','2024-06-25 18:35:16.775000',1),(141,'US_001','724d6e51-ea64-4','vcl\n','2024-06-25 18:38:41.111000',1),(142,'US_001','724d6e51-ea64-4','kkk\n','2024-06-25 18:40:40.426000',1),(143,'US_002','US_001','bro\n','2024-06-25 18:40:54.062000',1),(144,'US_002','US_001','bro\n','2024-06-25 18:41:15.751000',1),(145,'US_001','724d6e51-ea64-4','hehe\n','2024-06-26 04:22:40.531000',1),(146,'US_002','US_001','e cu\n','2024-06-26 04:22:49.604000',1),(147,'US_001','US_002','ha\n','2024-06-26 04:23:05.074000',1),(148,'US_002','US_001','an cut khong\n','2024-06-26 04:23:14.189000',1),(149,'US_001','US_002','khong\n','2024-06-26 04:23:24.355000',1),(150,'US_002','US_001','ee\n','2024-06-26 04:27:22.407000',1),(151,'US_001','US_002','ha\n','2024-06-26 04:30:54.770000',1),(152,'US_001','US_002','e cu\n','2024-06-26 04:31:35.643000',1),(153,'US_002','US_001','gi m\n','2024-06-26 04:32:15.407000',1),(154,'US_001','724d6e51-ea64-4','hehe\n','2024-06-26 04:33:50.073000',1),(155,'US_001','US_002','an cut kh\n','2024-06-26 04:41:00.261000',1),(156,'US_002','US_001','khong\n','2024-06-26 04:41:39.204000',1),(157,'US_001','724d6e51-ea64-4','haha\n','2024-06-26 04:41:51.887000',1),(158,'US_002','US_001','khong thi thoi\n','2024-06-26 04:41:57.916000',1),(159,'US_002','US_001','khong thi thoi\n','2024-06-26 04:42:07.041000',1),(160,'US_002','US_001','thoi cc\n','2024-06-26 04:42:12.337000',1),(161,'US_002','US_001','hello\n','2024-06-26 04:42:37.756000',1),(162,'US_001','US_002','lo cc\n','2024-06-26 04:42:49.784000',1),(163,'US_001','US_002','hahaah\n','2024-06-26 04:47:07.137000',1),(164,'US_002','US_001','e cu\n','2024-06-26 07:19:47.535000',1),(165,'US_001','US_002','gi m\n','2024-06-26 07:19:53.615000',1),(166,'US_001','US_002','bro\n','2024-06-26 10:36:08.566000',1),(167,'US_002','US_001','ha\n','2024-06-26 10:36:19.402000',1),(168,'US_001','US_002','an cut khong\n','2024-06-26 10:36:32.524000',1),(169,'US_002','US_001','khong\n','2024-06-26 10:36:40.147000',1),(170,'US_001','US_002','haha\n','2024-06-26 11:43:51.917000',1),(171,'US_002','US_001','hehe\n','2024-06-26 11:44:06.912000',1),(172,'US_002','US_001','e cu\n','2024-06-26 15:10:30.687000',1),(173,'US_001','US_002','ha\n','2024-06-26 15:10:35.342000',1),(174,'US_002','US_001','an cut khong\n','2024-06-26 15:10:40.045000',1),(175,'724d6e51-ea64-4','US_001','ayy\n','2024-06-27 11:36:07.036000',1),(176,'724d6e51-ea64-4','US_001','jaja\n','2024-06-27 11:48:39.512000',1),(177,'724d6e51-ea64-4','US_001','kk\n','2024-06-27 11:49:15.255000',1),(178,'724d6e51-ea64-4','US_001','jjdj\n','2024-06-27 11:49:16.627000',1),(179,'724d6e51-ea64-4','US_001','ddd\n','2024-06-27 11:49:30.649000',1),(180,'724d6e51-ea64-4','US_001','aa\n','2024-06-27 11:49:57.488000',1),(181,'724d6e51-ea64-4','US_001','ll\n','2024-06-27 11:50:10.722000',1),(182,'724d6e51-ea64-4','US_001','jaj\n','2024-06-27 11:51:14.794000',1),(183,'724d6e51-ea64-4','US_001','aaa\n','2024-06-27 11:51:17.300000',1),(184,'724d6e51-ea64-4','US_001','am\n','2024-06-27 11:51:24.461000',1),(185,'724d6e51-ea64-4','US_001','hey\n','2024-06-27 11:52:05.382000',1),(186,'724d6e51-ea64-4','US_001','ha\n','2024-06-27 11:52:15.651000',1),(187,'US_001','724d6e51-ea64-4','e cu\n','2024-06-27 11:52:34.416000',1),(188,'724d6e51-ea64-4','US_001','gi v\n','2024-06-27 11:52:43.486000',1),(189,'724d6e51-ea64-4','US_001','hahaha\n','2024-06-27 11:52:56.405000',1),(190,'724d6e51-ea64-4','US_001','kkk\n','2024-06-27 11:53:13.434000',1),(191,'US_001','US_002','jj\n','2024-07-01 08:48:08.697000',1),(192,'US_001','724d6e51-ea64-4','haha\n','2024-07-01 10:08:53.751000',1),(193,'724d6e51-ea64-4','US_001','kkk\n','2024-07-09 04:34:19.585000',0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package_premium`
--

DROP TABLE IF EXISTS `package_premium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `package_premium` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cost` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_premium`
--

LOCK TABLES `package_premium` WRITE;
/*!40000 ALTER TABLE `package_premium` DISABLE KEYS */;
INSERT INTO `package_premium` VALUES (1,150000,30),(2,550000,90),(3,1000000,180),(4,1500000,365),(5,1000000,75),(6,1750000,75);
/*!40000 ALTER TABLE `package_premium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `view` int(10) unsigned DEFAULT NULL,
  `cost` int(10) unsigned DEFAULT NULL,
  `type` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (1,5,10,1),(2,5,18,2);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ratings` (
  `user_id` varchar(20) NOT NULL,
  `comic_id` varchar(20) NOT NULL,
  `score` int(10) unsigned NOT NULL,
  `comment` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`comic_id`),
  KEY `fk_ratings_comics` (`comic_id`),
  CONSTRAINT `fk_ratings_comics` FOREIGN KEY (`comic_id`) REFERENCES `comicbooks` (`id`),
  CONSTRAINT `fk_ratings_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES ('724d6e51-ea64-4','B_001',5,'10dd'),('c4866bd6-5db7-4','B_001',5,'hehe'),('c4866bd6-5db7-4','B_009',4,'kk'),('US_001','B_009',4,'Hay quá'),('US_002','B_009',5,'aaa');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_reasons`
--

DROP TABLE IF EXISTS `report_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `report_reasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` varchar(100) NOT NULL,
  `type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `report_reasons_chk_1` CHECK (((`type` >= 1) and (`type` <= 2)))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_reasons`
--

LOCK TABLES `report_reasons` WRITE;
/*!40000 ALTER TABLE `report_reasons` DISABLE KEYS */;
INSERT INTO `report_reasons` VALUES (1,'Thô tục',1),(2,'Đạo văn',1),(3,'Nội dung nhạy cảm',1),(4,'Lời lẽ thô tục',2),(5,'Spam',2);
/*!40000 ALTER TABLE `report_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_bank_account`
--

DROP TABLE IF EXISTS `system_bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `system_bank_account` (
  `bank_account` varchar(20) NOT NULL,
  `bank_name` varchar(20) NOT NULL,
  `balance` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`bank_account`,`bank_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_bank_account`
--

LOCK TABLES `system_bank_account` WRITE;
/*!40000 ALTER TABLE `system_bank_account` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wallet_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` text,
  `amount` int(11) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `balance` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_wallet_transactions` (`wallet_id`),
  CONSTRAINT `fk_wallet_transactions` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (86,2,1,'Nạp tiền vào ví ','',100000,'2024-06-21 17:34:18.734000',9990503),(87,1,3,'Donate cho Lai Van Quy','hi anh',10000,'2024-06-21 17:35:39.461000',300986109),(88,2,4,'Nhận donate từ Le Dinh Bao','hi anh',10000,'2024-06-21 17:35:39.461000',10000503),(89,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:36:02.197000',10000505),(90,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:36:02.314000',300986111),(91,2,3,'Donate cho Le Dinh Bao','hihi',10000,'2024-06-21 17:44:49.343000',9990505),(92,1,4,'Nhận donate từ Lai Van Quy','hihi',10000,'2024-06-21 17:44:49.343000',300996111),(93,1,2,'Đăng ký gói premium 30 ngày','',150000,'2024-06-21 17:46:03.704000',300846111),(94,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:54:02.213000',300846113),(95,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-23 09:45:56.904000',9990507),(96,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 05:46:32.479000',9990509),(97,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 05:46:32.619000',300846115),(98,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 06:06:32.434000',9990511),(99,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 06:06:32.529000',300846117),(100,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 07:28:32.414000',9990513),(101,1,5,'Lợi nhuận hằng tháng','',4,'2024-06-26 15:15:18.789000',300846121),(102,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-26 15:27:18.754000',300846123),(103,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-02 07:35:18.951000',300846125),(104,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-03 17:25:15.067000',300846127),(105,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 02:36:47.421000',9990515),(106,2,5,'Lợi nhuận hằng tháng','',6,'2024-07-04 02:38:47.427000',9990521),(107,1,5,'Lợi nhuận hằng tháng','',4,'2024-07-04 02:38:47.512000',300846131),(108,1,5,'Lợi nhuận hằng tháng','',4,'2024-07-04 05:57:41.675000',300846135),(109,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 09:57:09.465000',300846137),(110,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 14:41:09.120000',9990523),(111,2,1,'Nạp tiền vào ví ','',20000,'2024-07-06 10:21:02.511000',10010523),(112,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 10:45:34.395000',300846139),(113,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 11:13:34.369000',300846141),(114,4,1,'Nạp tiền vào ví ','',1000000,'2024-07-06 13:23:13.417000',1000000),(115,4,2,'Đăng ký gói premium 30 ngày','',150000,'2024-07-06 13:23:43.642000',850000),(116,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 17:50:59.193000',300846143),(117,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:00:03.231000',10010525),(118,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:20:03.195000',10010527),(119,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-08 09:22:03.255000',10010531),(120,1,5,'Lợi nhuận hằng tháng','',10,'2024-07-08 09:22:03.362000',300846153),(121,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:28:03.248000',10010533),(122,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:28:03.319000',300846155),(123,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:34:03.196000',10010535),(124,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:46:03.206000',10010537),(125,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:48:03.274000',300846157),(126,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 10:00:03.270000',300846159),(127,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 10:32:03.254000',10010539),(128,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 11:40:03.215000',10010541),(129,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 11:40:03.278000',300846161),(130,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 14:32:03.181000',10010543),(131,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 14:32:03.237000',300846163),(132,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:11:33.652000',300846165),(133,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:19:33.606000',10010545),(134,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:27:33.679000',300846167),(135,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:35:36.091000',10010547),(136,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:35:36.183000',300846169),(137,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:37:36.091000',10010549),(138,2,5,'Lợi nhuận hằng tháng','',10,'2024-07-09 06:57:36.115000',10010559),(139,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-09 06:59:36.124000',10010563),(140,2,5,'Lợi nhuận hằng tháng','',10,'2024-07-09 07:17:08.398000',10010573),(141,1,5,'Lợi nhuận hằng tháng','',8,'2024-07-09 07:17:08.637000',300846177),(142,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 07:25:08.406000',300846179),(143,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 18:15:04.233000',300846181),(144,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-10 05:05:50.385000',10010575),(145,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-10 05:07:50.359000',10010577);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_premium`
--

DROP TABLE IF EXISTS `user_premium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_premium` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `package_id` int(11) DEFAULT NULL,
  `start_date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `user_premium_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_premium_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `package_premium` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_premium`
--

LOCK TABLES `user_premium` WRITE;
/*!40000 ALTER TABLE `user_premium` DISABLE KEYS */;
INSERT INTO `user_premium` VALUES (2,'US_001',2,'2024-05-16'),(3,'724d6e51-ea64-4',1,'2024-06-18'),(4,'US_002',1,'2024-06-22'),(5,'c4866bd6-5db7-4',1,'2024-07-06');
/*!40000 ALTER TABLE `user_premium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` varchar(20) NOT NULL,
  `name` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `password` text NOT NULL,
  `isLocked` tinyint(1) DEFAULT '0',
  `created_at` date NOT NULL,
  `birthDate` date NOT NULL,
  `intro` text,
  `isOnline` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `user_name` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('724d6e51-ea64-4','Laviem','https://res.cloudinary.com/dooppr30k/image/upload/v1718942953/dfpu5hmwsmts8goqryek.jpg','lvqshopp@gmail.com','0355773094','laivanquy','$2a$10$taIdukbcgQFUDIfhC6XP1en5oXvAFrTbUbyZG97kj8x6qm2qU70Wu',0,'2024-06-03','2008-12-03','saraheoh',1),('c4866bd6-5db7-4','Nguyễn Thị B','https://res.cloudinary.com/dooppr30k/image/upload/v1720284985/f6gxoxhgc8ttxxtxzt08.jpg','20110708@student.hcmute.edu.vn','0352027837','nguyenthib','$2a$10$crAA6DXwVWn91mMV01L9Jui0/JFAAg0NooCpn27DxFacz7DmBnaou',0,'2024-07-06','2002-11-06','gai xinh vo cung tan',1),('US_001','Lai Van Quy','https://res.cloudinary.com/dooppr30k/image/upload/v1720601804/thcdd1mp2nq6xuxsldxt.jpg','quylang012@gmail.com','0221234343','Quyne','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW',0,'2023-12-06','2002-12-06','Quy dep trai top 1',1),('US_002','Le Dinh Bao','https://res.cloudinary.com/dooppr30k/image/upload/v1719217887/xxs2vntf4ibpetdkdhjc.jpg','hjihi012@gmail.com','0243434328','Baone','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW',0,'2023-11-09','1990-02-11','hihihihi',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallets`
--

DROP TABLE IF EXISTS `wallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `wallets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `balance` int(11) DEFAULT '0',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `bank_account` varchar(20) DEFAULT NULL,
  `bank_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_wallet` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
INSERT INTO `wallets` VALUES (1,'US_002',300846181,'2023-12-23 15:17:57.856000',NULL,NULL),(2,'US_001',10010577,'2023-12-23 18:43:09.127000',NULL,NULL),(3,'724d6e51-ea64-4',9840000,'2024-06-18 09:10:54.256000',NULL,NULL),(4,'c4866bd6-5db7-4',850000,'2024-07-06 13:21:31.438000',NULL,NULL);
/*!40000 ALTER TABLE `wallets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-10 16:53:15
