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
INSERT INTO `announce` VALUES ('298f6955-4f11-4','US_001','Người Đàn Ông Mít Ướt, truyện mà bạn thích vừa thêm 1 chương mới','2024-07-15 11:44:07.710000','fvr',1,'/comic-detail/B_005'),('50900895-e6f7-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 11:29:23.004000','prf',1,'/wallet'),('54b5b614-0d2b-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 11:47:23.044000','prf',0,'/wallet'),('583650bc-0e47-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 11:35:23.014000','prf',1,'/wallet'),('69d06058-79da-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 11:31:22.987000','prf',1,'/wallet'),('7b3d8815-7ebf-4','US_001','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 11:05:23.051000','prf',1,'/wallet'),('856053f7-026d-4','US_001','laivanquyvừa cập nhật ảnh đại diện','2024-07-15 11:04:03.015000','avt',1,'/user/724d6e51-ea64-4'),('c23387db-27b8-4','US_001','Laviem đã gửi tặng bạn 100000VND','2024-07-15 11:40:11.224000','dn',1,'/wallet'),('d5d11153-156f-4','US_001','Quyne vừa bình luận về truyện của bạn với nội dung \"hahaha\"','2024-07-15 11:29:08.495000','cmt',1,'/chapter/CH_010?commentId=55'),('e7790d62-ecac-4','US_001','Laviemvừa tạo 1 truyện mới','2024-07-15 11:33:57.034000','ncm',1,'/comic-detail/4537b579-4726-4'),('fab6d187-7c2a-4','US_001','laivanquy vừa bình luận về truyện của bạn với nội dung \"truyen hay qua\"','2024-07-15 11:29:41.302000','cmt',1,'/chapter/CH_010?commentId=56'),('fb8c888f-2404-4','US_002','Bạn vừa nhận được lợi nhuận tháng số tiền 1VND','2024-07-15 12:23:22.976000','prf',0,'/wallet');
/*!40000 ALTER TABLE `announce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bookmark` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `chapter` varchar(20) NOT NULL,
  `current_page` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `chapter` (`chapter`),
  CONSTRAINT `bookmark_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `bookmark_ibfk_2` FOREIGN KEY (`chapter`) REFERENCES `chapters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (1,'US_001','CH_008',0),(3,'US_001','CH_019',6),(4,'US_001','CH_017',2),(7,'US_001','CH_010',6),(10,'c4866bd6-5db7-4','CH_017',2),(12,'US_002','CH_010',0),(13,'US_001','CH_007',0),(14,'US_002','CH_015',0),(15,'US_002','CH_016',6),(16,'US_002','CH_017',0),(17,'US_001','CH_013',6),(18,'US_001','CH_014',6),(19,'724d6e51-ea64-4','CH_010',6),(20,'US_001','c84bd126-7072-4',0),(21,'724d6e51-ea64-4','CH_017',4);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
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
INSERT INTO `chapters` VALUES ('c84bd126-7072-4','Chapter 2','B_005','2024-07-15',2,1,1),('CH_007','Chapter 1','B_004','2023-12-23',1,1,1),('CH_008','Chapter 2','B_004','2023-12-23',2,1,1),('CH_010','Chapter 1','B_005','2023-12-23',1,1,1),('CH_013','Chapter 1','B_007','2023-12-23',1,1,1),('CH_014','Chapter 2','B_007','2023-12-23',2,1,1),('CH_015','Chapter 1','B_008','2023-12-23',1,1,1),('CH_016','Chapter 2','B_008','2023-12-23',2,1,1),('CH_017','Chapter 1','B_009','2023-12-23',1,1,1),('CH_019','Chapter 1','B_010','2023-12-23',1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic_report`
--

LOCK TABLES `comic_report` WRITE;
/*!40000 ALTER TABLE `comic_report` DISABLE KEYS */;
INSERT INTO `comic_report` VALUES (7,'B_009','2024-07-13',1),(8,'B_009','2024-07-13',1),(9,'B_009','2024-07-13',1);
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
INSERT INTO `comic_report_reasons` VALUES (9,1),(7,2),(8,2);
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
INSERT INTO `comicbooks` VALUES ('4537b579-4726-4','Trai đẹp vô cùng tận',0,'724d6e51-ea64-4','8a19b3dc98c14b6782b11cccee3980d4.jpg','Đây là trai đẹp vô cùng tận',0,0.0,'2024-07-15','2024-07-15',1,0,0),('B_004','Brave Bell',1,'US_001','yruewjdhfjrydhfndfheidjfn.jpg','Sanada Souji, học sinh cuối cấp trung học, thông minh và khoẻ mạnh. Anh ấy cũng có bản chất tốt bụng và không ngần ngại giúp đỡ những người gặp khó khăn. Tuy nhiên, gia đình anh là yakuza. Vì điều này mà anh bị những người xung quanh ghét bỏ. Liệu sự cô đơn này có kéo dài mãi mãi? Trong khi sự lo lắng chiếm lấy tâm trí anh, anh nhận được một cuộc điện thoại và mọi thứ bắt đầu diễn ra theo chiều hướng bất ngờ. Đây là câu chuyện anh hùng của một chàng trai trẻ muốn trở thành anh hùng và phải đối mặt với một tổ chức khổng lồ bí ẩn.',69,4.0,'2023-12-23','2024-06-01',1,69,0),('B_005','Người Đàn Ông Mít Ướt',0,'US_001','yrfugdhbvfgherukjsdnamew.jpg','Một câu chuyện nặng nề về tâm lý, về những tên tâm thần. Nhân vật chính là một người đàn ông mít ướt nhút nhát đã có gia đình, nợ nần chồng chất vì cờ bạc. Anh không có cách nào lật ngược tình thế cho đến khi ông chủ của một công ty cho vay mờ ám giao cho anh công việc đòi nợ vì thân hình to lớn bất thường của anh. Đòi nợ không phải là công việc duy nhất. Thỉnh thoảng, anh ta được giao những công việc lặt vặt mờ ám khác, chẳng hạn như làm tài xế cho gái mại dâm và vận chuyển những thứ mờ ám (xác).',231,3.0,'2023-12-23','2024-07-15',1,231,0),('B_007','INITIAL D',0,'US_001','dfhbvfbgyufejhwenwihriefncdfvefe.jpg','Câu chuyện kể về một chiếc xe mang nhãn hiệu 86 huyền thoại có tốc độ di chuyển như sấm sét được mệnh danh là “Bóng ma của núi Akina” cùng với con đường chinh phục đỉnh cao của thế giới đua xe mạo hiểm của một cậu bé 18 tuổi Takumi Fujiwara. Được thừa hưởng dòng máu từ một tay đua siêu phàm, Takumi sớm đã bộc lộ năng lực và tố chất bẩm sinh khi chỉ mới 13 tuổi, dưới sự dìu dắt của cha mình cậu đã nhanh chóng hoàn thiện các kỹ năng bậc nhất trong nghệ thuật đua xe.',106,4.1,'2023-12-23','2023-12-23',1,106,0),('B_008','THẦN SỦNG TIẾN HÓA',0,'US_002','bjsndwuihdnwjbduhdndjsh.jpg','Thiên địa dị biến, yêu thú sinh sôi, kỷ nguyên mới của nhân loại đã cho ra đời 1 nghề nghiệp mới: thu phục quái vật, nuôi dưỡng quái vật, huấn luyện quái vật, đây chính là nghề Ngự Sử',66,4.6,'2023-12-23','2023-12-23',1,66,0),('B_009','Võ Luyện Đỉnh Phong',0,'US_002','dshdbsvhdfbhdguefbhefbsfbjsfbehgfjsb.jpg','Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông tha, mới có thể có thể phá võ chi cực đạo.',60,4.3,'2023-12-23','2023-12-23',1,60,0),('B_010','The Kingdom of Ruin',0,'US_001','qtwyeuirtrkfgnvxcanfdjhf.jpg','Con người từ xưa đã sống dưới sự bảo hộ của phù thủy, họ tôn kính, biết ơn và đồng thời cũng cảm thấy ... KHIẾP SỢ trước năng lực của các phù thủy. Con người muốn nổi dậy, muốn chứng minh rằng thế giới hiện nay là do họ làm chủ ...',78,4.1,'2023-12-23','2023-12-23',1,78,0),('B_011','Sự Trỗi Dậy Của Anh Hùng Thất Nghiệp',0,'US_001','adbsjfeuhrwndfhsfhvdhgwiuejw.jpg','Karna là cậu bé được phong cho danh hiệu Bậc hiền nhân từ thiên đàng, cậu được thu nhận vào một đội anh hùng. Nhưng kĩ năng Gọi hồn của cậu lại quá kinh tởm nên cậu bị đá khỏi đội ngay lập tức và trở thành kẻ thất nghiệp',1188,4.1,'2023-12-23','2023-12-23',1,1188,0),('B_012','Con Gái Của Mafia',0,'US_002','dbfhjbdsbfeygruwhiwfbhjdbvdjbfef.jpg','Câu chuyện kể về một chàng trai bình thường tên Mekh, cuộc đời sắp thay đổi vào thời điểm anh vô tình đụng phải cô gái khét tiếng và dễ bị hiểu lầm tên Saran.',11,4.9,'2023-12-23','2023-12-23',1,11,0),('B_013','Dr.slump',0,'US_001','wdnwjheuwhdjbdegfudfbrbdbsbvbdjf.jpg','Nhân vật chính của truyện là Arale, một cô bé robot giống hệt con người (tương tự nhân vật Pinocchio trong truyện thiếu nhi Ý). Tiến sĩ Slump tạo ra Arale nhằm khẳng định tài năng siêu việt của mình.',233,4.6,'2023-12-23','2024-07-10',1,233,0),('B_014','The Fable - The Second Contact',0,'US_002','adwfedhwhncvbxvdanskadjsdhws.jpg','Nối tiếp câu chuyện của Sát Thủ Ẩn Dật',425,4.7,'2023-12-23','2023-12-23',1,425,0),('B_015','Kagurabachi',0,'US_001','dwehwjfndhgwdwjrywgwbcjsdbwgeqhewgr.jpg','Cậu bé Chihiro dành cả ngày để luyện tập dưới sự hướng dẫn của người cha rèn kiếm nổi tiếng của mình. Một ngày nào đó anh hy vọng sẽ trở thành một thợ rèn kiếm vĩ đại',362,4.4,'2023-12-23','2023-12-23',1,362,0),('B_016','One-Punch Man',0,'US_002','MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzAtYzUwOWQyM2E3OGI2XkEyXkFqcGdeQXVyNTgyNTA4MjM.jpg','Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama, một con người mà nhìn đâu cũng thấy “tầm thường”, từ khuôn mặt vô hồn, cái đầu trọc lóc, cho tới thể hình long tong',575,4.9,'2023-12-23','2023-12-23',1,575,0),('B_017','Gia Tộc Điệp Viên Yozakura (REUP)',0,'US_001','ssdeheuheufegfdufdufhue.png','Taiyou Asano là 1 học sinh cao trung gặp vấn đề trong việc giao tiếp với mọi người. Bạn thời thơ ấu của cậu ta, Mutsumi Yozakura, là người duy nhất có thể nói chuyện bình thường với Taiyou. Rồi 1 ngày cậu phát hiện ra Mutsumi là thành viên của 1 gia đình điệp viên!',39,4.5,'2023-12-23','2023-12-23',1,39,0),('B_018','Deatte 5 Byou de Battle',0,'US_002','dwegwjqkndwjheugfdbchdw.jpg','Một ngày nọ, cậu học sinh cao trung mê game, cuồng kẹo Shiroyanagi Akira bị kéo vào một trận chiến bởi một cô gái bí ẩn tự xưng là Mion. Những người tham gia được thông báo rằng họ đã bị xóa tên khỏi hộ khẩu gia đình, tham gia vào một thí nghiệm và được ban sức mạnh đặc biệt.',335,3.7,'2023-12-23','2023-12-23',1,335,0),('B_020','Gachi Akuta',0,'US_002','sdbwhhuewhruehturthnvdfndvi.jpg','Một khu ổ chuột nơi con cháu của những tên tội phạm sinh sống. Người dân bên kia biên giới coi thường anh như một bộ tộc và bị kỳ thị. Rudo, một đứa trẻ mồ côi, sống trong một khu ổ chuột với cha mẹ của mình, Legt, và kiếm sống bằng cách sử dụng những khả năng thể chất khác xa so với những người bình thường.',798,4.8,'2023-12-23','2023-12-23',1,798,0),('B_021','Gậy Gỗ Cấp 99+',0,'US_001','dgsjdbsndvbsjdbsndbsjdghbshdshj.jpg','Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!Thanh niên main trong game thực tế ảo bị gái lừa giết chết rồi vô tình được cho 1 chiếc gậy gỗ tân thủ. Bug game khiến cho main cường hóa cây gậy này lên cấp 99+ tối đa. Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!',259,4.6,'2023-12-23','2023-12-23',1,259,0),('B_022','Tomb Raider King',0,'US_002','98736tuyejwhdbshsgdwkjdsb.jpg','Hầm mộ của những vị thân xuất hiện ở khắp nơi trên thế giới, và ở những nơi đó cũng chôn cất rất nhiều thánh tích mang sức mạnh của những vị thần. Câu chuyện kể về một tên trộm với tài năng dị biệt muốn thu thập tất cả các thánh tích.',104,4.8,'2023-12-23','2023-12-23',1,104,0),('B_023','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','wdgfsyjhbdhsydhwuyeryr347eyhwudksh.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',76,4.7,'2023-12-23','2023-12-23',1,76,0),('B_024','Kengan Ashura',0,'US_002','sdgyejhdbeyr7ery47yrhusdbdhfbdjc.jpg','Từ thời Edo đã tồn tại các đầu trường, mà tại đó các thương gia thuê đấu sĩ đấu tay không với nhau, bên nào thắng sẽ có tất cả. Tokita Ouma, biệt danh là Ashura tham gia đấu trường và đánh thắng tất cả các đấu thủ của mình.',101,4.8,'2023-12-23','2023-12-23',1,101,0),('B_025','Tòa Tháp Bí Ẩn',0,'US_001','iturekjhdeygrhdejdbvhdvb.jpg','Mong muốn của bạn là gì ? Tiền ? Vinh quang ? Quyền lực ? sự báo thù ? hay một điều gì vượt trội hơn?Những gì mà bạn mong muốn ... đều ở đây !',90,4.2,'2023-12-23','2023-12-23',1,90,0),('B_026','Y Võ Chí Tôn',0,'US_001','hfuer3iuiejdefhdyjhbsjdbasjdbsn.jpg','Truyện tranh Y Võ Chí Tôn được cập nhật nhất và đầy đủ nhất tại TruyenTranhLH.net. Hãy ghé thăm TruyenTranhLH.net mỗi ngày để được đọc các chương mới nhất của Y Võ Chí Tôn.',78,4.8,'2023-12-23','2023-12-23',1,78,0),('B_027','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','dehgfdehjdbwjfbyrt4ty3u.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',200,3.8,'2023-12-23','2023-12-23',1,200,0),('B_028','Area no kishi',0,'US_001','reury74736726474y37ryheudh.jpg','Nghĩ rằng mình là một thằng bất tài, Aizawa Kakeru từ bỏ giấc mơ cầu thủ để trở thành manager của đội bóng đá của trưởng. Nhưng thực chất cậu lại có một tài năng vô cùng tuyệt vời mà chỉ có Suguru - anh trai cậu đồng thời cũng là tuyển thủ của đội tuyển quốc gia Nhật Bản nhận ra được. Mọi chuyện ngày càng phức tạp hơn khi Seven - một người bạn thời thơ ấu mà Kakeru đem lòng yêu mến xuất hiện...',334,4.8,'2023-12-23','2023-12-23',1,334,0),('B_029','Naruto',0,'US_002','sdfrer454676.jpg','Naruto là một cậu bé có mơ ước trở thành hokage của làng Konoha,được Hokage phong ấn trong người một trong 9 quái vật của thể giới : Cửu vĩ Hồ ly.Vì cho cậu là một con quái vật, ko ai dám chơi với cậu!',422,4.1,'2023-12-23','2023-12-23',1,422,0),('B_030','Katsu!',0,'US_001','sdjnejfjefueijrwijewije83u4jeo2.jpg','Ờ thì trong một thành phố nào đó ở Nhật, có một chàng trai tình cờ gặp được một cô gái xinh đẹp. Do phải lòng nàng, chàng đã đăng kí vào một phòng tập boxing do cha nàng làm chủ, nhưng không may thay là cha mẹ nàng đã ly hôn còn nàng thì lại cực kì ghét boxing. Rồi chuyện tình éo le của đôi \"uyên ương\" này sẽ về đâu?',223,4.8,'2023-12-23','2023-12-23',1,223,0);
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
INSERT INTO `comicbooks_genres` VALUES ('GR_03','4537b579-4726-4'),('GR_07','B_004'),('GR_08','B_005'),('GR_09','B_005'),('GR_05','B_007'),('GR_10','B_007'),('GR_01','B_008'),('GR_08','B_008'),('GR_02','B_009'),('GR_07','B_009'),('GR_04','B_010'),('GR_10','B_010'),('GR_08','B_011'),('GR_09','B_011'),('GR_03','B_012'),('GR_10','B_012'),('GR_06','B_013'),('GR_07','B_013'),('GR_09','B_013'),('GR_01','B_014'),('GR_02','B_014'),('GR_03','B_015'),('GR_07','B_015'),('GR_08','B_015'),('GR_05','B_016'),('GR_06','B_016'),('GR_01','B_017'),('GR_04','B_017'),('GR_02','B_018'),('GR_03','B_018'),('GR_03','B_020'),('GR_05','B_020'),('GR_02','B_021'),('GR_03','B_021'),('GR_04','B_021'),('GR_05','B_022'),('GR_07','B_022'),('GR_08','B_022'),('GR_02','B_023'),('GR_09','B_023'),('GR_04','B_024'),('GR_05','B_024'),('GR_06','B_024'),('GR_01','B_025'),('GR_05','B_025'),('GR_06','B_025'),('GR_07','B_025'),('GR_10','B_025'),('GR_02','B_026'),('GR_08','B_026'),('GR_10','B_026'),('GR_03','B_027'),('GR_08','B_027'),('GR_03','B_028'),('GR_10','B_028'),('GR_02','B_029'),('GR_05','B_029'),('GR_01','B_030'),('GR_07','B_030');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (6,'US_001','CH_017','2024-05-16 06:32:17.600000','nhu cut'),(7,'US_001','CH_015','2024-06-06 16:02:52.052000','Hay quas'),(8,'US_001','CH_015','2024-06-06 16:04:10.199000','lazada'),(9,'US_001','CH_016','2024-06-06 16:06:48.173000','hóng chương tiếp theo'),(10,'US_001','CH_015','2024-06-06 16:43:07.231000','Quas tuyets voi'),(11,'US_001','CH_015','2024-06-06 16:43:36.321000','hay qua di'),(12,'US_001','CH_016','2024-06-06 16:52:18.933000','truyen hay qua'),(13,'US_001','CH_016','2024-06-06 16:55:58.735000','10 diem khong co nhung'),(14,'US_001','CH_016','2024-06-06 16:57:52.834000','amazing gut chop'),(15,'US_001','CH_016','2024-06-06 17:09:01.911000','mlem mlem'),(16,'US_001','CH_016','2024-06-06 17:12:31.003000','tam duoc'),(17,'US_001','CH_016','2024-06-06 19:02:29.899000','tuyet cu meo'),(18,'US_001','CH_016','2024-06-06 19:02:54.852000','ow ke'),(19,'US_001','CH_016','2024-06-06 19:03:07.737000','hay qua di'),(20,'US_001','CH_015','2024-06-06 20:09:28.792000','a'),(21,'US_001','CH_015','2024-06-06 20:53:53.111000','b'),(22,'US_001','CH_016','2024-06-07 04:56:14.009000','đỉnh vậy'),(23,'US_001','CH_015','2024-06-07 09:54:00.301000','comment moi'),(24,'US_001','CH_016','2024-06-07 09:57:48.638000','binh luan tai day'),(25,'US_002','CH_015','2024-06-07 09:58:37.693000','ncc'),(26,'US_001','CH_016','2024-06-07 09:59:08.289000','perfect'),(27,'US_001','CH_016','2024-06-07 10:03:31.442000','cai deo gi day'),(28,'US_001','CH_016','2024-06-07 10:04:22.111000','what the hell man'),(29,'US_002','CH_016','2024-06-07 10:13:25.800000','duma '),(30,'US_001','CH_015','2024-06-07 10:14:56.819000','fuck'),(31,'US_001','CH_016','2024-06-07 10:33:50.778000','adu'),(32,'US_001','CH_017','2024-06-07 10:43:36.247000','cut bo'),(34,'US_001','CH_016','2024-06-12 08:49:32.545000','hahaha'),(35,'US_001','CH_017','2024-06-18 02:52:11.882000','hihi'),(46,'US_001','CH_017','2024-06-26 15:14:46.645000','kkk'),(47,'c4866bd6-5db7-4','CH_017','2024-07-06 11:13:17.857000','hay qua'),(50,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:09.042000','aa'),(51,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:12.432000','adjdj'),(52,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:15.974000','dhhjs'),(53,'724d6e51-ea64-4','CH_019','2024-07-09 04:22:28.242000','shhs\n'),(55,'US_001','CH_010','2024-07-15 11:29:08.444000','hahaha'),(56,'724d6e51-ea64-4','CH_010','2024-07-15 11:29:41.281000','truyen hay qua');
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
INSERT INTO `donate` VALUES ('0833c9c3-9211-4',1,2,'Le Dinh Bao donated to Lai Van Quy','rtyuio',5445,'2024-06-12 09:38:15.546000'),('1e4424ef-5406-4',2,1,'Lai Van Quy donated to Le Dinh Bao','122',100000,'2024-06-05 18:55:22.956000'),('1f0632f9-f063-4',3,2,'Laviem donated to Lai Van Quy','en fan anh',100000,'2024-07-15 11:40:11.018000'),('24edd3a7-e1e8-4',1,2,'Le Dinh Bao donated to Lai Van Quy','chao cau',9999,'2024-06-12 09:36:44.513000'),('2ba81471-4582-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Lvq0612@a',100000,'2024-06-05 18:37:42.771000'),('4630a3cc-6e2b-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi',100000,'2024-06-05 18:49:21.667000'),('5baf9849-8d75-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Lvq chuyen tien',111111,'2024-06-12 09:32:39.546000'),('699c66bf-0d35-4',1,2,'Le Dinh Bao donated to Lai Van Quy','From mixi with love',123123,'2024-06-12 07:43:18.859000'),('6ec316ed-4d78-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi',10000,'2024-06-21 17:44:49.339000'),('72220779-aeb0-4',2,1,'Lai Van Quy donated to Le Dinh Bao','hihi2',100000,'2024-06-05 18:51:17.951000'),('7281cc82-75e8-4',2,1,'Lai Van Quy donated to Le Dinh Bao','yeye',1234,'2024-06-07 05:35:09.398000'),('851d6d47-24e3-4',1,2,'Le Dinh Bao donated to Lai Van Quy','hihi',123321,'2024-06-12 09:30:32.760000'),('8c41e975-393a-4',2,1,'Lai Van Quy donated to Le Dinh Bao','Em fan anh',1000,'2023-12-25 16:49:09.204000'),('9daf961e-f0b1-4',2,1,'Lai Van Quy donated to Le Dinh Bao','1211',1111,'2024-06-05 18:58:19.330000'),('a7eaee9a-07b3-4',1,2,'Le Dinh Bao donated to Lai Van Quy','ajaha',11221,'2024-06-12 09:38:52.385000'),('abfc1e48-777e-4',2,1,'Lai Van Quy donated to Le Dinh Bao','qua tuyet voi',10000,'2024-05-16 06:36:32.652000'),('adfafd09-6c70-4',3,2,'Laviem donated to Lai Van Quy','Lvq chuyen tien',10000,'2024-06-21 06:46:30.812000'),('cc33d419-03f7-4',1,2,'Le Dinh Bao donated to Lai Van Quy','chao abn',6666,'2024-06-12 09:37:23.382000'),('d4d8705e-d3f3-4',2,1,'Lai Van Quy donated to Le Dinh Bao','abvgyw',1111,'2024-06-05 19:00:20.302000'),('dafb4aa9-e113-4',1,2,'Le Dinh Bao donated to Lai Van Quy','fhgg',13313,'2024-06-12 09:39:15.590000'),('fe1ae675-b24e-4',1,2,'Le Dinh Bao donated to Lai Van Quy','hi anh',10000,'2024-06-21 17:35:39.454000');
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
INSERT INTO `favorite_comic` VALUES ('US_001','B_005'),('c4866bd6-5db7-4','B_009'),('US_001','B_011'),('US_001','B_015'),('US_002','B_022'),('US_001','B_024');
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
) ENGINE=InnoDB AUTO_INCREMENT=429 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_increase_view`
--

LOCK TABLES `history_increase_view` WRITE;
/*!40000 ALTER TABLE `history_increase_view` DISABLE KEYS */;
INSERT INTO `history_increase_view` VALUES (172,'B_005','2024-06-15'),(173,'B_022','2024-06-15'),(174,'B_025','2024-06-15'),(175,'B_025','2024-06-15'),(176,'B_025','2024-06-15'),(177,'B_025','2024-06-15'),(178,'B_025','2024-06-15'),(179,'B_025','2024-06-15'),(180,'B_025','2024-06-15'),(181,'B_025','2024-06-15'),(182,'B_025','2024-06-15'),(183,'B_025','2024-06-15'),(184,'B_025','2024-06-15'),(185,'B_025','2024-06-15'),(186,'B_005','2024-06-15'),(187,'B_005','2024-06-15'),(188,'B_005','2024-06-15'),(189,'B_005','2024-06-15'),(190,'B_005','2024-06-15'),(191,'B_005','2024-06-15'),(192,'B_005','2024-06-15'),(193,'B_005','2024-06-15'),(194,'B_025','2024-06-15'),(195,'B_025','2024-06-15'),(196,'B_025','2024-06-15'),(197,'B_025','2024-06-15'),(198,'B_025','2024-06-15'),(199,'B_025','2024-06-15'),(200,'B_025','2024-06-15'),(201,'B_025','2024-06-15'),(202,'B_025','2024-06-15'),(203,'B_025','2024-06-15'),(204,'B_025','2024-06-15'),(205,'B_025','2024-06-15'),(206,'B_025','2024-06-15'),(222,'B_015','2024-06-17'),(224,'B_013','2024-06-17'),(225,'B_022','2024-06-18'),(226,'B_022','2024-06-18'),(227,'B_022','2024-06-18'),(228,'B_005','2024-06-18'),(230,'B_005','2024-06-18'),(231,'B_005','2024-06-18'),(232,'B_015','2024-06-18'),(233,'B_005','2024-06-18'),(234,'B_005','2024-06-18'),(237,'B_011','2024-06-18'),(238,'B_005','2024-06-18'),(239,'B_027','2024-06-18'),(242,'B_015','2024-06-18'),(243,'B_009','2024-06-20'),(245,'B_005','2024-06-20'),(246,'B_009','2024-06-20'),(247,'B_015','2024-06-20'),(248,'B_022','2024-06-21'),(249,'B_023','2024-06-21'),(251,'B_015','2024-06-21'),(252,'B_015','2024-06-21'),(253,'B_009','2024-06-21'),(254,'B_022','2024-06-22'),(255,'B_025','2024-06-22'),(256,'B_022','2024-06-22'),(257,'B_015','2024-06-23'),(258,'B_015','2024-06-24'),(259,'B_009','2024-06-24'),(260,'B_022','2024-06-24'),(261,'B_005','2024-06-24'),(262,'B_015','2024-06-24'),(268,'B_022','2024-06-26'),(269,'B_009','2024-06-26'),(270,'B_022','2024-06-26'),(271,'B_009','2024-07-02'),(272,'B_009','2024-07-04'),(273,'B_015','2024-07-04'),(274,'B_018','2024-07-04'),(275,'B_020','2024-07-04'),(276,'B_017','2024-07-04'),(277,'B_010','2024-07-04'),(278,'B_021','2024-07-04'),(279,'B_009','2024-07-04'),(280,'B_009','2024-07-04'),(281,'B_009','2024-07-04'),(282,'B_005','2024-07-04'),(283,'B_009','2024-07-06'),(284,'B_009','2024-07-06'),(285,'B_009','2024-07-07'),(287,'B_010','2024-07-08'),(288,'B_010','2024-07-08'),(289,'B_010','2024-07-08'),(290,'B_020','2024-07-08'),(291,'B_022','2024-07-08'),(292,'B_016','2024-07-08'),(293,'B_029','2024-07-08'),(294,'B_024','2024-07-08'),(295,'B_007','2024-07-08'),(296,'B_010','2024-07-08'),(297,'B_024','2024-07-08'),(298,'B_010','2024-07-08'),(299,'B_010','2024-07-08'),(300,'B_009','2024-07-08'),(301,'B_009','2024-07-08'),(302,'B_010','2024-07-08'),(303,'B_010','2024-07-08'),(304,'B_009','2024-07-08'),(305,'B_024','2024-07-08'),(306,'B_010','2024-07-08'),(307,'B_009','2024-07-09'),(308,'B_010','2024-07-09'),(309,'B_009','2024-07-09'),(310,'B_009','2024-07-09'),(311,'B_010','2024-07-09'),(312,'B_010','2024-07-09'),(313,'B_025','2024-07-09'),(314,'B_010','2024-07-09'),(315,'B_026','2024-07-09'),(316,'B_025','2024-07-09'),(317,'B_012','2024-07-09'),(318,'B_007','2024-07-09'),(320,'B_028','2024-07-09'),(321,'B_007','2024-07-09'),(322,'B_010','2024-07-09'),(323,'B_009','2024-07-09'),(325,'B_005','2024-07-09'),(326,'B_009','2024-07-09'),(327,'B_008','2024-07-09'),(329,'B_008','2024-07-09'),(330,'B_024','2024-07-09'),(331,'B_009','2024-07-10'),(332,'B_005','2024-07-10'),(333,'B_005','2024-07-10'),(334,'B_010','2024-07-11'),(335,'B_010','2024-07-11'),(336,'B_010','2024-07-11'),(337,'B_010','2024-07-11'),(338,'B_010','2024-07-11'),(339,'B_010','2024-07-11'),(340,'B_010','2024-07-11'),(341,'B_010','2024-07-11'),(342,'B_009','2024-07-11'),(343,'B_010','2024-07-11'),(344,'B_010','2024-07-11'),(345,'B_010','2024-07-11'),(346,'B_010','2024-07-11'),(347,'B_010','2024-07-11'),(348,'B_010','2024-07-11'),(349,'B_010','2024-07-11'),(350,'B_009','2024-07-11'),(351,'B_009','2024-07-11'),(352,'B_010','2024-07-11'),(353,'B_010','2024-07-11'),(354,'B_009','2024-07-11'),(355,'B_009','2024-07-11'),(356,'B_010','2024-07-11'),(357,'B_010','2024-07-11'),(358,'B_010','2024-07-11'),(359,'B_010','2024-07-11'),(360,'B_010','2024-07-11'),(361,'B_010','2024-07-11'),(362,'B_010','2024-07-11'),(363,'B_010','2024-07-11'),(364,'B_010','2024-07-11'),(365,'B_010','2024-07-11'),(366,'B_010','2024-07-12'),(367,'B_010','2024-07-12'),(368,'B_010','2024-07-12'),(369,'B_005','2024-07-12'),(370,'B_005','2024-07-12'),(371,'B_009','2024-07-12'),(372,'B_005','2024-07-12'),(373,'B_008','2024-07-12'),(375,'B_010','2024-07-13'),(376,'B_017','2024-07-13'),(377,'B_010','2024-07-13'),(378,'B_009','2024-07-13'),(379,'B_009','2024-07-13'),(380,'B_005','2024-07-13'),(381,'B_009','2024-07-13'),(382,'B_009','2024-07-13'),(383,'B_009','2024-07-13'),(384,'B_009','2024-07-13'),(386,'B_005','2024-07-15'),(387,'B_005','2024-07-15'),(388,'B_005','2024-07-15'),(389,'B_009','2024-07-15'),(390,'B_005','2024-07-15'),(391,'B_009','2024-07-15'),(392,'B_005','2024-07-15'),(393,'B_008','2024-07-15'),(394,'B_005','2024-07-15'),(395,'B_005','2024-07-15'),(396,'B_012','2024-07-15'),(398,'B_005','2024-07-15'),(399,'B_008','2024-07-15'),(400,'B_008','2024-07-15'),(401,'B_005','2024-07-15'),(402,'B_005','2024-07-15'),(403,'B_007','2024-07-15'),(404,'B_008','2024-07-15'),(405,'B_008','2024-07-15'),(406,'B_015','2024-07-15'),(407,'B_005','2024-07-15'),(409,'B_005','2024-07-15'),(410,'B_008','2024-07-15'),(411,'B_024','2024-07-15'),(412,'B_013','2024-07-15'),(413,'B_008','2024-07-15'),(414,'B_009','2024-07-15'),(415,'B_012','2024-07-15'),(416,'B_009','2024-07-15'),(417,'B_009','2024-07-15'),(418,'B_010','2024-07-15'),(419,'B_010','2024-07-15'),(420,'B_010','2024-07-15'),(421,'B_010','2024-07-15'),(422,'B_015','2024-07-15'),(423,'B_005','2024-07-15'),(424,'B_005','2024-07-15'),(425,'B_005','2024-07-15'),(426,'B_008','2024-07-15'),(427,'B_009','2024-07-15'),(428,'B_009','2024-07-15');
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
INSERT INTO `history_reading` VALUES ('724d6e51-ea64-4','CH_010','2024-07-15 11:29:35.121000'),('724d6e51-ea64-4','CH_013','2024-07-08 09:21:00.977000'),('724d6e51-ea64-4','CH_017','2024-07-15 11:47:22.703000'),('724d6e51-ea64-4','CH_019','2024-07-09 04:20:57.652000'),('c4866bd6-5db7-4','CH_017','2024-07-13 14:50:06.532000'),('US_001','c84bd126-7072-4','2024-07-15 11:44:22.936000'),('US_001','CH_007','2024-07-15 12:14:27.282000'),('US_001','CH_008','2024-07-15 10:11:04.394000'),('US_001','CH_010','2024-07-15 11:29:02.060000'),('US_001','CH_013','2024-07-09 06:57:33.073000'),('US_001','CH_014','2024-07-15 10:16:52.283000'),('US_001','CH_015','2024-06-07 10:42:47.756000'),('US_001','CH_017','2024-07-11 09:22:45.799000'),('US_001','CH_019','2024-07-13 08:53:29.133000'),('US_002','CH_010','2024-07-15 08:44:55.652000'),('US_002','CH_015','2024-07-15 10:09:10.825000'),('US_002','CH_016','2024-07-15 10:08:55.909000'),('US_002','CH_017','2024-06-07 10:46:28.679000');
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
) ENGINE=InnoDB AUTO_INCREMENT=689 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (55,'CH_008','ryeuiwokwjdshfnjhdnedsk.jpg',1),(56,'CH_008','mhdgsudhwudhiw.jpg',2),(57,'CH_008','kjhghshdwuduwkj.jpg',3),(58,'CH_008','ncdncuhdiwdjwhdwuh.jpg',4),(59,'CH_008','kjsihdwidjwpdwdeudjwu.jpg',5),(60,'CH_008','ndjbdwhdwguqwhw.jpg',6),(61,'CH_008','ihywhewygdhddvbmdjn.jpg',7),(90,'CH_013','sdhjdnejdhsnkjdm.jpg',1),(91,'CH_013','luyijakjsgwhukdhuyd.jpg',2),(92,'CH_013','3456782uhewy6ywushj.jpg',3),(93,'CH_013','8765rytghjsbhfdghjs.jpg',4),(94,'CH_013','987uhshggwhjndsdhj.jpg',5),(95,'CH_013','45tyghbvy6utwyuh.jpg',6),(96,'CH_013','7667uhbsghgh.jpg',7),(97,'CH_014','djncehjsdnwskhdjwdsuj.jpg',1),(98,'CH_014','072uwhdbshdbshb.jpg',2),(99,'CH_014','176277ehdsdbjhbcsx.jpg',3),(100,'CH_014','98765425678u3ejdsdsghbn.jpg',4),(101,'CH_014','6hgdsd78uwewu.jpg',5),(102,'CH_014','3647854redytfgdbfegjhs.jpg',6),(103,'CH_014','orr47ru83ieuhdyhs.jpg',7),(104,'CH_015','hdjhsndjsdnsdhbnhn.jpg',1),(105,'CH_015','92883746yreujdbfejhdsn.jpg',2),(106,'CH_015','56787ushuwgshvdbsh.jpg',3),(107,'CH_015','28743yrhiufdfgh387.jpg',4),(108,'CH_015','bhdbcjhdnwknsdn.jpg',5),(109,'CH_015','ueiowekwdbkjsnc.jpg',6),(110,'CH_015','hdjsndiwuijwjw8.jpg',7),(111,'CH_016','smsjhsjnjsabjk.jpg',1),(112,'CH_016','iuywtyusjedsbnjnx.jpg',2),(113,'CH_016','287wtyhssddgyshjn.jpg',3),(114,'CH_016','gcydhwd78u2oueidhs.jpg',4),(115,'CH_016','dgdvbsdbws82728.jpg',5),(116,'CH_016','cvbnsgdwytyswdgw8.jpg',6),(117,'CH_016','vbrufgh3874283urhd.jpg',7),(118,'CH_017','wgjdhnedgehujsdwius.jpg',1),(119,'CH_017','82787uewhdedn.jpg',2),(120,'CH_017','cbdhwyduqwdugsuh.jpg',3),(121,'CH_017','e7h3yegdheygh3iuh.jpg',4),(122,'CH_017','6e74eyurhfrdfy3uehjds.jpg',5),(123,'CH_017','bhcbdwudjwoidjnsj.jpg',6),(124,'CH_017','67438eruhfrsdfghwsdj.jpg',7),(132,'CH_019','siuweu3iu38edij.jpg',1),(133,'CH_019','467eryduhnjfyeujdksm.jpg',2),(134,'CH_019','39876ey3uidsgdbuhjsdbnwha.jpg',3),(135,'CH_019','478tr7euihbfrhdjmsjd.jpg',4),(136,'CH_019','cbhsjkdhwyuw8ui.jpg',5),(137,'CH_019','8374iurjehbdhgbsdgwyshj.jpg',6),(138,'CH_019','hdujnesdg7838uei288367.jpg',7),(670,'CH_010','2be367ac005345f29b923631a5545340.jpg',1),(671,'CH_010','18b6abbab486461ba5faba51b73e060f.jpg',2),(672,'CH_010','844a5251c38a473cbeea6984939e7968.jpg',3),(673,'CH_010','c20ae5df4b994e7b867a0a7486518c57.jpg',4),(674,'CH_010','0b85f0bd6ff542b38756353be538fb03.jpg',5),(675,'CH_010','e0ea7b2c4f8b45b4918be60ff6dd0320.jpg',6),(676,'CH_010','55d438ff9e994bd5b3d911589812e6dc.jpg',7),(677,'CH_007','46664917fab644c0a74de4884d81ad87.jpg',1),(678,'CH_007','153fb373d95a47928361313c957c0438.jpg',2),(679,'CH_007','24aa62ab047641bc9172bcc771a0637e.jpg',3),(680,'CH_007','2e327357e4ed4a529c666fcec8a1cc3c.jpg',4),(681,'CH_007','3add2adbbef940a8b8110d36d4a81a2d.jpg',5),(682,'CH_007','79e7b8e0a5fa45d2bdb73da8d0fe6442.jpg',6),(683,'CH_007','8c0a0cc5241449cead127a2394c527f1.jpg',7),(684,'c84bd126-7072-4','dbb5acddaf53440c8574a88536bbfe57.jpg',1),(685,'c84bd126-7072-4','74be5fa022db4afa935c78803f6c087d.jpg',2),(686,'c84bd126-7072-4','98b63cabda714fa7a7884d02521fdbbf.jpg',3),(687,'c84bd126-7072-4','d94857914eb445739891531fc415d9d6.jpg',4),(688,'c84bd126-7072-4','4b134e3d3600479c9862f93b82b71811.jpg',5);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidtoken`
--

DROP TABLE IF EXISTS `invalidtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `invalidtoken` (
  `id` varchar(40) NOT NULL,
  `expire_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidtoken`
--

LOCK TABLES `invalidtoken` WRITE;
/*!40000 ALTER TABLE `invalidtoken` DISABLE KEYS */;
INSERT INTO `invalidtoken` VALUES ('13d3d9ce-6955-40fd-a5f0-6d87e546e1e3','2024-07-12 10:51:58.000000'),('16ff1f30-7276-4f04-a51b-0b27d1e72684','2024-07-12 14:07:24.000000'),('24619b33-771b-4d4a-a7f4-4fb75dd7c2d1','2024-07-12 16:08:41.000000'),('2859f84a-acb9-4b49-a5f2-46bcd455eff0','2024-07-15 09:16:00.000000'),('2fe30162-71a8-4d9f-85e8-498e7ba9b969','2024-07-13 18:31:20.000000'),('362b0ad5-9e0e-4dea-a616-bf85be37b93b','2024-07-14 13:47:35.000000'),('44955f90-78fb-47f4-82b8-767c1364bafd','2024-07-15 16:23:02.000000'),('44e3abb4-3e46-46de-ac43-3926bba965b6','2024-07-15 14:54:46.000000'),('54ee5f27-5aa4-451e-99f1-53ceff8a3805','2024-07-15 12:41:46.000000'),('608678f8-9a17-4dae-ab5b-6eea42b17b8e','2024-07-12 10:55:16.000000'),('89f61a51-2510-4d40-a459-9828256355d4','2024-07-12 11:09:22.000000'),('b098cac7-5818-49eb-8fa5-fceb8a09f2b3','2024-07-12 08:37:54.000000'),('bbd782da-184f-44e2-b291-c3032181f64e','2024-07-15 14:23:12.000000'),('bfeb10c9-0579-4209-828e-30f9c9f1bf36','2024-07-12 08:27:34.000000'),('c29b11e3-4bfe-4e23-868f-d2daef22543b','2024-07-13 09:20:25.000000'),('c4b464e7-f748-43b9-ad5b-2e9b14857bda','2024-07-12 11:29:10.000000'),('e1e3237d-1925-4bcc-8cf3-c7c609c832f6','2024-07-15 12:44:31.000000'),('e9a722e2-d0d1-4487-9283-5865d17ef09b','2024-07-15 12:43:01.000000'),('f8227397-d61d-4135-ba6b-6dc3844fbf27','2024-07-13 09:25:54.000000');
/*!40000 ALTER TABLE `invalidtoken` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (201,'US_001','US_002','chao ban\n','2024-07-15 10:54:12.982000',1),(202,'US_002','US_001','nghe ban oi\n','2024-07-15 10:54:55.810000',1),(203,'US_001','US_002','hahaha khong co gi\n','2024-07-15 10:55:02.262000',0),(204,'US_002','US_001','o vay thoi\n','2024-07-15 10:55:08.249000',1),(205,'US_001','724d6e51-ea64-4','hello\n','2024-07-15 10:56:24.373000',1),(206,'724d6e51-ea64-4','US_001','xin chao\n','2024-07-15 10:56:34.213000',1),(207,'US_001','724d6e51-ea64-4','rat vui duoc noi chuyenj voi ban\n','2024-07-15 10:56:46.458000',1),(208,'724d6e51-ea64-4','US_001','oke ban\n','2024-07-15 10:56:51.656000',1),(209,'US_001','724d6e51-ea64-4','ban co nguoi yeu chua\n','2024-07-15 10:57:04.299000',1),(210,'724d6e51-ea64-4','US_001','minh lam gi co nguoi yeu, con dang so e day nay\n','2024-07-15 10:57:16.131000',1),(211,'US_001','US_002','ko ni chi wa\n','2024-07-15 10:57:38.072000',0),(212,'US_001','US_002','nice to meet you\n','2024-07-15 10:57:56.016000',0),(213,'724d6e51-ea64-4','US_002','hello guy\n','2024-07-15 11:45:43.273000',0),(214,'724d6e51-ea64-4','US_002','how are you today\n','2024-07-15 11:46:19.008000',0);
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
INSERT INTO `price` VALUES (1,100,10,1),(2,5,18,2);
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
INSERT INTO `ratings` VALUES ('c4866bd6-5db7-4','B_009',4,'A\nS\nA'),('US_001','B_005',3,'Qua xa da'),('US_001','B_009',4,'Hay quá'),('US_002','B_009',5,'aaa');
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
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (86,2,1,'Nạp tiền vào ví ','',100000,'2024-06-21 17:34:18.734000',9990503),(87,1,3,'Donate cho Lai Van Quy','hi anh',10000,'2024-06-21 17:35:39.461000',300986109),(88,2,4,'Nhận donate từ Le Dinh Bao','hi anh',10000,'2024-06-21 17:35:39.461000',10000503),(89,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:36:02.197000',10000505),(90,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:36:02.314000',300986111),(91,2,3,'Donate cho Le Dinh Bao','hihi',10000,'2024-06-21 17:44:49.343000',9990505),(92,1,4,'Nhận donate từ Lai Van Quy','hihi',10000,'2024-06-21 17:44:49.343000',300996111),(93,1,2,'Đăng ký gói premium 30 ngày','',150000,'2024-06-21 17:46:03.704000',300846111),(94,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-21 17:54:02.213000',300846113),(95,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-23 09:45:56.904000',9990507),(96,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 05:46:32.479000',9990509),(97,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 05:46:32.619000',300846115),(98,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 06:06:32.434000',9990511),(99,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 06:06:32.529000',300846117),(100,2,5,'Lợi nhuận hằng tháng','',2,'2024-06-24 07:28:32.414000',9990513),(101,1,5,'Lợi nhuận hằng tháng','',4,'2024-06-26 15:15:18.789000',300846121),(102,1,5,'Lợi nhuận hằng tháng','',2,'2024-06-26 15:27:18.754000',300846123),(103,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-02 07:35:18.951000',300846125),(104,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-03 17:25:15.067000',300846127),(105,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 02:36:47.421000',9990515),(106,2,5,'Lợi nhuận hằng tháng','',6,'2024-07-04 02:38:47.427000',9990521),(107,1,5,'Lợi nhuận hằng tháng','',4,'2024-07-04 02:38:47.512000',300846131),(108,1,5,'Lợi nhuận hằng tháng','',4,'2024-07-04 05:57:41.675000',300846135),(109,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 09:57:09.465000',300846137),(110,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-04 14:41:09.120000',9990523),(111,2,1,'Nạp tiền vào ví ','',20000,'2024-07-06 10:21:02.511000',10010523),(112,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 10:45:34.395000',300846139),(113,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 11:13:34.369000',300846141),(114,4,1,'Nạp tiền vào ví ','',1000000,'2024-07-06 13:23:13.417000',1000000),(115,4,2,'Đăng ký gói premium 30 ngày','',150000,'2024-07-06 13:23:43.642000',850000),(116,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-06 17:50:59.193000',300846143),(117,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:00:03.231000',10010525),(118,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:20:03.195000',10010527),(119,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-08 09:22:03.255000',10010531),(120,1,5,'Lợi nhuận hằng tháng','',10,'2024-07-08 09:22:03.362000',300846153),(121,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:28:03.248000',10010533),(122,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:28:03.319000',300846155),(123,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:34:03.196000',10010535),(124,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:46:03.206000',10010537),(125,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 09:48:03.274000',300846157),(126,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 10:00:03.270000',300846159),(127,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 10:32:03.254000',10010539),(128,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 11:40:03.215000',10010541),(129,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 11:40:03.278000',300846161),(130,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 14:32:03.181000',10010543),(131,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-08 14:32:03.237000',300846163),(132,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:11:33.652000',300846165),(133,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:19:33.606000',10010545),(134,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 04:27:33.679000',300846167),(135,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:35:36.091000',10010547),(136,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:35:36.183000',300846169),(137,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 06:37:36.091000',10010549),(138,2,5,'Lợi nhuận hằng tháng','',10,'2024-07-09 06:57:36.115000',10010559),(139,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-09 06:59:36.124000',10010563),(140,2,5,'Lợi nhuận hằng tháng','',10,'2024-07-09 07:17:08.398000',10010573),(141,1,5,'Lợi nhuận hằng tháng','',8,'2024-07-09 07:17:08.637000',300846177),(142,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 07:25:08.406000',300846179),(143,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-09 18:15:04.233000',300846181),(144,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-10 05:05:50.385000',10010575),(145,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-10 05:07:50.359000',10010577),(146,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 07:07:45.619000',10010579),(147,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 08:20:50.478000',10010581),(148,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-11 09:04:50.501000',10010585),(149,2,5,'Lợi nhuận hằng tháng','',6,'2024-07-11 09:06:50.489000',10010591),(150,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:12:50.483000',10010593),(151,2,5,'Lợi nhuận hằng tháng','',6,'2024-07-11 09:16:50.432000',10010599),(152,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:16:50.500000',300846183),(153,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:18:50.470000',10010601),(154,2,5,'Lợi nhuận hằng tháng','',10,'2024-07-11 09:22:50.472000',10010611),(155,1,5,'Lợi nhuận hằng tháng','',8,'2024-07-11 09:22:50.566000',300846191),(156,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:24:50.424000',10010613),(157,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-11 09:36:50.443000',10010617),(158,2,5,'Lợi nhuận hằng tháng','',6,'2024-07-11 09:42:50.436000',10010623),(159,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:50:50.507000',10010625),(160,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-11 09:54:50.467000',10010627),(161,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-11 09:56:50.468000',10010631),(162,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-12 06:53:43.626000',10010633),(163,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-12 08:48:57.960000',10010635),(164,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-12 08:58:57.908000',10010637),(165,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-12 09:52:57.926000',10010641),(166,2,5,'Lợi nhuận hằng tháng','',2,'2024-07-12 11:43:15.356000',10010643),(167,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-12 11:43:15.494000',300846193),(168,1,5,'Lợi nhuận hằng tháng','',2,'2024-07-13 05:18:45.018000',300846195),(169,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 08:30:44.064000',10010644),(170,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 08:52:44.071000',10010645),(171,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 08:54:43.984000',10010646),(172,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 14:39:49.438000',300846196),(173,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 14:41:49.423000',10010647),(174,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 14:41:49.503000',300846197),(175,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 14:51:49.463000',300846198),(176,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 14:59:49.447000',300846199),(177,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-13 15:13:49.414000',300846200),(178,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-14 18:42:14.580000',10010648),(179,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-14 18:50:14.568000',10010649),(180,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:03:24.896000',300846201),(181,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:19:24.791000',10010650),(182,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:29:24.811000',300846202),(183,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:45:11.203000',10010651),(184,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:49:11.210000',300846203),(185,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 05:57:11.125000',10010652),(186,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 06:19:11.078000',10010653),(187,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 06:19:11.159000',300846204),(188,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-15 06:21:11.083000',10010657),(189,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 06:33:11.099000',10010658),(190,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 06:33:11.174000',300846205),(191,2,1,'Nạp tiền vào ví ','',10000,'2024-07-15 06:37:23.884000',10020658),(192,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 07:25:11.061000',10020659),(193,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 07:25:11.132000',300846206),(194,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 08:05:11.123000',300846207),(195,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 08:11:10.285000',10020660),(196,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 08:45:40.325000',10020661),(197,2,5,'Lợi nhuận hằng tháng','',4,'2024-07-15 09:41:40.342000',10020665),(198,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 09:52:00.652000',10020666),(199,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 09:54:00.695000',300846208),(200,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 10:19:23.033000',10020667),(201,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 10:55:22.998000',300846209),(202,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:01:23.005000',300846210),(203,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:05:23.043000',10020668),(204,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:29:22.996000',10020669),(205,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:31:22.978000',10020670),(206,2,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:35:23.000000',10020671),(207,3,3,'Donate cho Lai Van Quy','en fan anh',100000,'2024-07-15 11:40:11.178000',9740000),(208,2,4,'Nhận donate từ Laviem','en fan anh',100000,'2024-07-15 11:40:11.177000',10120671),(209,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 11:47:23.032000',300846211),(210,1,5,'Lợi nhuận hằng tháng','',1,'2024-07-15 12:23:22.968000',300846212);
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
  `lastActiveTime` timestamp(6) NULL DEFAULT NULL,
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
INSERT INTO `users` VALUES ('724d6e51-ea64-4','Laviem','https://res.cloudinary.com/dooppr30k/image/upload/v1721041442/s94jnrukiwaljjsr00wk.jpg','lvqshopp@gmail.com','0355773094','laivanquy','$2a$10$taIdukbcgQFUDIfhC6XP1en5oXvAFrTbUbyZG97kj8x6qm2qU70Wu',0,'2024-06-03','2008-12-03','saraheoh',1,'2024-07-15 12:14:05.551000'),('c4866bd6-5db7-4','Nguyễn Thị B','https://res.cloudinary.com/dooppr30k/image/upload/v1720284985/f6gxoxhgc8ttxxtxzt08.jpg','20110708@student.hcmute.edu.vn','0352027837','nguyenthib','$2a$10$crAA6DXwVWn91mMV01L9Jui0/JFAAg0NooCpn27DxFacz7DmBnaou',0,'2024-07-06','2002-11-06','gai xinh vo cung tan',1,'2024-07-15 10:54:26.434000'),('US_001','Lai Van Quy','https://res.cloudinary.com/dooppr30k/image/upload/v1720957206/jttmvk3e66xckzp0fmer.jpg','quylang012@gmail.com','0221234343','Quyne','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW',0,'2023-12-06','2002-12-06','Quy dep trai top 1',0,'2024-07-15 12:24:30.540000'),('US_002','Le Dinh Bao','https://res.cloudinary.com/dooppr30k/image/upload/v1719217887/xxs2vntf4ibpetdkdhjc.jpg','hjihi012@gmail.com','0243434328','Baone','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW',0,'2023-11-09','1990-02-11','hihihihi',1,'2024-07-15 10:54:50.519000');
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
INSERT INTO `wallets` VALUES (1,'US_002',300846212,'2023-12-23 15:17:57.856000',NULL,NULL),(2,'US_001',10120671,'2023-12-23 18:43:09.127000',NULL,NULL),(3,'724d6e51-ea64-4',9740000,'2024-06-18 09:10:54.256000',NULL,NULL),(4,'c4866bd6-5db7-4',850000,'2024-07-06 13:21:31.438000',NULL,NULL);
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

-- Dump completed on 2024-07-15 19:26:47
