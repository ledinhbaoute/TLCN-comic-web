CREATE DATABASE  IF NOT EXISTS `comicbooks_reading` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `comicbooks_reading`;
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
-- Table structure for table `annouce`
--

DROP TABLE IF EXISTS `annouce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `annouce` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receiver_id` varchar(20) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_annouce_user` (`receiver_id`),
  CONSTRAINT `fk_annouce_user` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annouce`
--

LOCK TABLES `annouce` WRITE;
/*!40000 ALTER TABLE `annouce` DISABLE KEYS */;
/*!40000 ALTER TABLE `annouce` ENABLE KEYS */;
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
  `publish_date` date NOT NULL,
  `ordinal_number` int(10) unsigned NOT NULL,
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
INSERT INTO `chapters` VALUES ('CH_001','Giới thiệu','B_001','2023-12-01',1),('CH_002','Vụ án đầu tiên','B_001','2023-12-01',2),('CH_003','Chapter 1','B_002','2023-12-01',1),('CH_004','Chapter 2','B_002','2023-12-01',2),('CH_005','Chapter 1','B_003','2023-12-01',1),('CH_006','Chapter 2','B_003','2023-12-01',2),('CH_007','Chapter 1','B_004','2023-12-01',1),('CH_008','Chapter 2','B_004','2023-12-01',2),('CH_009','Chapter 1','B_005','2023-12-01',1),('CH_010','Chapter 2','B_005','2023-12-01',2),('CH_011','Chapter 1','B_006','2023-12-01',1),('CH_012','Chapter 2','B_006','2023-12-01',2),('CH_013','Chapter 1','B_007','2023-12-01',1),('CH_014','Chapter 2','B_007','2023-12-01',2),('CH_015','Chapter 1','B_008','2023-12-01',1),('CH_016','Chapter 2','B_008','2023-12-01',2),('CH_017','Chapter 1','B_009','2023-12-01',1),('CH_018','Chapter 2','B_009','2023-12-01',2),('CH_019','Chapter 1','B_010','2023-12-01',1),('CH_020','Chapter 2','B_010','2023-12-01',2);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comic_report`
--

LOCK TABLES `comic_report` WRITE;
/*!40000 ALTER TABLE `comic_report` DISABLE KEYS */;
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
INSERT INTO `comicbooks` VALUES ('B_001','Conan',0,'US_001','56230picture16309480627.jpg','Mở đầu câu truyện, cậu học sinh trung học 17 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường xuất sắc. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ Ran Mori, cậu tình cờ chứng kiến vụ một án giết người, Kishida - một hành khách trong trò chơi Chuyến tàu tốc hành đã bị giết một cách dã man. Cậu đã giúp cảnh sát làm sáng tỏ vụ án. Trên đường về nhà, cậu vô tình phát hiện một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Khi chúng phát hiện ra cậu, Shinichi đã bị đánh ngất đi. Sau đó những người đàn ông áo đen đó đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy mình đã bị teo nhỏ lại thành hình dạng của một cậu học sinh tiểu học.',33,5.0,'2023-12-01','2023-12-01',1),('B_002','Dead Account',0,'US_002','deadaccount.jpg','Souji Enishiro, 15 tuổi (đã bỏ học), là một streamer gây tranh cãi, “Aoringo”(Táo Xanh) người kiếm được rất nhiều tiền nhờ nội dung video bạo lực thái quá của mình. Mặc dù được coi là một kẻ chuyên gây rối, nhưng trên thực tế, cậu ấy là một người anh tốt bụng, yêu em gái mình và đồ ngọt. Ngay cả những video gây tranh cãi của anh cũng chỉ là để trang trải chi phí y tế khổng lồ cho cô em gái ốm yếu. Cho dù mọi người trên thế giới có ghét cậu ấy, cậu ấy vẫn hạnh phúc miễn là cô em gái Akari có thể sống tốt. Đó là cho đến khi có chuyện gì đó xảy ra với em gái yêu quý của cậu ấy… Đây là sự khởi đầu của một loạt hành động trừ tà theo phong cách hiện đại mới!',623,0.0,'2023-12-01','2023-12-01',1),('B_003','One Piece',1,'US_002','asdvgvdgvfgsvdjqhebwyeg.jpg','Truyện One Piece: Monkey D. Luffy, 1 cậu bé rất thích hải tặc có ước mơ tìm được kho báu One Piece và trở thành Vua hải tặc - Pirate King. Lúc nhỏ, Luffy tình cờ ăn phải trái quỉ (Devil Fruit) Gomu Gomu, nó cho cơ thể cậu khả năng co dãn đàn hồi như cao su nhưng đổi lại cậu sẽ không bao giờ biết bơi. Sau đó Luffy lại được...',189,4.9,'2023-12-01','2023-12-01',1),('B_004','Brave Bell',0,'US_001','yruewjdhfjrydhfndfheidjfn.jpg','Sanada Souji, học sinh cuối cấp trung học, thông minh và khoẻ mạnh. Anh ấy cũng có bản chất tốt bụng và không ngần ngại giúp đỡ những người gặp khó khăn. Tuy nhiên, gia đình anh là yakuza. Vì điều này mà anh bị những người xung quanh ghét bỏ. Liệu sự cô đơn này có kéo dài mãi mãi? Trong khi sự lo lắng chiếm lấy tâm trí anh, anh nhận được một cuộc điện thoại và mọi thứ bắt đầu diễn ra theo chiều hướng bất ngờ. Đây là câu chuyện anh hùng của một chàng trai trẻ muốn trở thành anh hùng và phải đối mặt với một tổ chức khổng lồ bí ẩn.',21,4.0,'2023-12-01','2023-12-01',1),('B_005','Người Đàn Ông Mít Ướt',0,'US_001','yrfugdhbvfgherukjsdnamew.jpg','Một câu chuyện nặng nề về tâm lý, về những tên tâm thần. Nhân vật chính là một người đàn ông mít ướt nhút nhát đã có gia đình, nợ nần chồng chất vì cờ bạc. Anh không có cách nào lật ngược tình thế cho đến khi ông chủ của một công ty cho vay mờ ám giao cho anh công việc đòi nợ vì thân hình to lớn bất thường của anh. Đòi nợ không phải là công việc duy nhất. Thỉnh thoảng, anh ta được giao những công việc lặt vặt mờ ám khác, chẳng hạn như làm tài xế cho gái mại dâm và vận chuyển những thứ mờ ám (xác).',190,4.0,'2023-12-01','2023-12-01',1),('B_006','Spin-Off Học Viện Kimetsu!',0,'US_002','vchsjbrgfuwkjnsjfvefdkjfndsjbfdj.jpg','Ngoại truyện Học viện Kimetsu! Được thực hiện bởi tác giả Natsuki Hokami, phát triển cốt truyện từ các trang ngoại truyện nhỏ của tác phẩm gốc Kimetsu no Yaiba do tác giả Koyoharu Gotoge chắp bút. Các nhân vật trở thành học sinh và giáo viên vô cùng ưu tú và bất ổn, đem tới những câu chuyện về cuộc sống học đường yên bình và vui vẻ!',12,4.1,'2023-12-01','2023-12-01',1),('B_007','INITIAL D',0,'US_001','dfhbvfbgyufejhwenwihriefncdfvefe.jpg','Câu chuyện kể về một chiếc xe mang nhãn hiệu 86 huyền thoại có tốc độ di chuyển như sấm sét được mệnh danh là “Bóng ma của núi Akina” cùng với con đường chinh phục đỉnh cao của thế giới đua xe mạo hiểm của một cậu bé 18 tuổi Takumi Fujiwara. Được thừa hưởng dòng máu từ một tay đua siêu phàm, Takumi sớm đã bộc lộ năng lực và tố chất bẩm sinh khi chỉ mới 13 tuổi, dưới sự dìu dắt của cha mình cậu đã nhanh chóng hoàn thiện các kỹ năng bậc nhất trong nghệ thuật đua xe.',101,4.1,'2023-12-01','2023-12-01',1),('B_008','THẦN SỦNG TIẾN HÓA',0,'US_002','bjsndwuihdnwjbduhdndjsh.jpg','Thiên địa dị biến, yêu thú sinh sôi, kỷ nguyên mới của nhân loại đã cho ra đời 1 nghề nghiệp mới: thu phục quái vật, nuôi dưỡng quái vật, huấn luyện quái vật, đây chính là nghề Ngự Sử',93,4.6,'2023-12-01','2023-12-01',1),('B_009','Võ Luyện Đỉnh Phong',0,'US_002','dshdbsvhdfbhdguefbhefbsfbjsfbehgfjsb.jpg','Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông tha, mới có thể có thể phá võ chi cực đạo.',21,4.0,'2023-12-01','2023-12-01',1),('B_010','The Kingdom of Ruin',0,'US_001','qtwyeuirtrkfgnvxcanfdjhf.jpg','Con người từ xưa đã sống dưới sự bảo hộ của phù thủy, họ tôn kính, biết ơn và đồng thời cũng cảm thấy ... KHIẾP SỢ trước năng lực của các phù thủy. Con người muốn nổi dậy, muốn chứng minh rằng thế giới hiện nay là do họ làm chủ ...',27,4.1,'2023-12-01','2023-12-01',1),('B_011','Sự Trỗi Dậy Của Anh Hùng Thất Nghiệp',0,'US_001','adbsjfeuhrwndfhsfhvdhgwiuejw.jpg','Karna là cậu bé được phong cho danh hiệu Bậc hiền nhân từ thiên đàng, cậu được thu nhận vào một đội anh hùng. Nhưng kĩ năng Gọi hồn của cậu lại quá kinh tởm nên cậu bị đá khỏi đội ngay lập tức và trở thành kẻ thất nghiệp',1187,4.1,'2023-12-01','2023-12-01',1),('B_012','Con Gái Của Mafia',0,'US_002','dbfhjbdsbfeygruwhiwfbhjdbvdjbfef.jpg','Câu chuyện kể về một chàng trai bình thường tên Mekh, cuộc đời sắp thay đổi vào thời điểm anh vô tình đụng phải cô gái khét tiếng và dễ bị hiểu lầm tên Saran.',8,4.9,'2023-12-01','2023-12-01',1),('B_013','Dr.slump',0,'US_001','wdnwjheuwhdjbdegfudfbrbdbsbvbdjf.jpg','Nhân vật chính của truyện là Arale, một cô bé robot giống hệt con người (tương tự nhân vật Pinocchio trong truyện thiếu nhi Ý). Tiến sĩ Slump tạo ra Arale nhằm khẳng định tài năng siêu việt của mình.',231,4.6,'2023-12-01','2023-12-01',1),('B_014','The Fable - The Second Contact',0,'US_002','adwfedhwhncvbxvdanskadjsdhws.jpg','Nối tiếp câu chuyện của Sát Thủ Ẩn Dật',425,4.7,'2023-12-01','2023-12-01',1),('B_015','Kagurabachi',0,'US_001','dwehwjfndhgwdwjrywgwbcjsdbwgeqhewgr.jpg','Cậu bé Chihiro dành cả ngày để luyện tập dưới sự hướng dẫn của người cha rèn kiếm nổi tiếng của mình. Một ngày nào đó anh hy vọng sẽ trở thành một thợ rèn kiếm vĩ đại',344,4.4,'2023-12-01','2023-12-01',1),('B_016','One-Punch Man',0,'US_002','MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzAtYzUwOWQyM2E3OGI2XkEyXkFqcGdeQXVyNTgyNTA4MjM.jpg','Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama, một con người mà nhìn đâu cũng thấy “tầm thường”, từ khuôn mặt vô hồn, cái đầu trọc lóc, cho tới thể hình long tong',575,4.9,'2023-12-01','2023-12-01',1),('B_017','Gia Tộc Điệp Viên Yozakura (REUP)',0,'US_001','ssdeheuheufegfdufdufhue.png','Taiyou Asano là 1 học sinh cao trung gặp vấn đề trong việc giao tiếp với mọi người. Bạn thời thơ ấu của cậu ta, Mutsumi Yozakura, là người duy nhất có thể nói chuyện bình thường với Taiyou. Rồi 1 ngày cậu phát hiện ra Mutsumi là thành viên của 1 gia đình điệp viên!',37,4.5,'2023-12-01','2023-12-01',1),('B_018','Deatte 5 Byou de Battle',0,'US_002','dwegwjqkndwjheugfdbchdw.jpg','Một ngày nọ, cậu học sinh cao trung mê game, cuồng kẹo Shiroyanagi Akira bị kéo vào một trận chiến bởi một cô gái bí ẩn tự xưng là Mion. Những người tham gia được thông báo rằng họ đã bị xóa tên khỏi hộ khẩu gia đình, tham gia vào một thí nghiệm và được ban sức mạnh đặc biệt.',333,3.7,'2023-12-01','2023-12-01',1),('B_019','Blue Lock',0,'US_001','sdbegdjegfjdgfshfyjegfyejgfdfguryteh.jpg','Yoichi Isagi đã bỏ lỡ cơ hội tham dự giải Cao Trung toàn quốc do đã chuyền cho đồng đội thay vì tự thân mình dứt điểm. Cậu là một trong 300 chân sút U-18 được tuyển chọn bởi Jinpachi Ego, người đàn ông được Hiệp Hội Bóng Đá Nhật Bản thuê sau hồi FIFA World Cup năm 2018, nhằm dẫn dắt Nhật Bản vô địch World Cup bằng cách tiêu diệt nền bóng đá Nhật Bản.',347,5.0,'2023-12-01','2023-12-01',1),('B_020','Gachi Akuta',0,'US_002','sdbwhhuewhruehturthnvdfndvi.jpg','Một khu ổ chuột nơi con cháu của những tên tội phạm sinh sống. Người dân bên kia biên giới coi thường anh như một bộ tộc và bị kỳ thị. Rudo, một đứa trẻ mồ côi, sống trong một khu ổ chuột với cha mẹ của mình, Legt, và kiếm sống bằng cách sử dụng những khả năng thể chất khác xa so với những người bình thường.',795,4.8,'2023-12-01','2023-12-01',1),('B_021','Gậy Gỗ Cấp 99+',0,'US_001','dgsjdbsndvbsjdbsndbsjdghbshdshj.jpg','Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!Thanh niên main trong game thực tế ảo bị gái lừa giết chết rồi vô tình được cho 1 chiếc gậy gỗ tân thủ. Bug game khiến cho main cường hóa cây gậy này lên cấp 99+ tối đa. Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!',254,4.6,'2023-12-02','2023-12-02',1),('B_022','Tomb Raider King',0,'US_002','98736tuyejwhdbshsgdwkjdsb.jpg','Hầm mộ của những vị thân xuất hiện ở khắp nơi trên thế giới, và ở những nơi đó cũng chôn cất rất nhiều thánh tích mang sức mạnh của những vị thần. Câu chuyện kể về một tên trộm với tài năng dị biệt muốn thu thập tất cả các thánh tích.',80,4.8,'2023-12-02','2023-12-02',1),('B_023','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','wdgfsyjhbdhsydhwuyeryr347eyhwudksh.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',75,4.7,'2023-12-02','2023-12-02',1),('B_024','Kengan Ashura',0,'US_002','sdgyejhdbeyr7ery47yrhusdbdhfbdjc.jpg','Từ thời Edo đã tồn tại các đầu trường, mà tại đó các thương gia thuê đấu sĩ đấu tay không với nhau, bên nào thắng sẽ có tất cả. Tokita Ouma, biệt danh là Ashura tham gia đấu trường và đánh thắng tất cả các đấu thủ của mình.',95,4.8,'2023-12-02','2023-12-02',1),('B_025','Tòa Tháp Bí Ẩn',0,'US_001','iturekjhdeygrhdejdbvhdvb.jpg','Mong muốn của bạn là gì ? Tiền ? Vinh quang ? Quyền lực ? sự báo thù ? hay một điều gì vượt trội hơn?Những gì mà bạn mong muốn ... đều ở đây !',57,4.2,'2023-12-02','2023-12-02',1),('B_026','Y Võ Chí Tôn',0,'US_001','hfuer3iuiejdefhdyjhbsjdbasjdbsn.jpg','Truyện tranh Y Võ Chí Tôn được cập nhật nhất và đầy đủ nhất tại TruyenTranhLH.net. Hãy ghé thăm TruyenTranhLH.net mỗi ngày để được đọc các chương mới nhất của Y Võ Chí Tôn.',77,4.8,'2023-12-02','2023-12-02',1),('B_027','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','dehgfdehjdbwjfbyrt4ty3u.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',595,3.8,'2023-12-02','2023-12-02',1),('B_028','Area no kishi',0,'US_001','reury74736726474y37ryheudh.jpg','Nghĩ rằng mình là một thằng bất tài, Aizawa Kakeru từ bỏ giấc mơ cầu thủ để trở thành manager của đội bóng đá của trưởng. Nhưng thực chất cậu lại có một tài năng vô cùng tuyệt vời mà chỉ có Suguru - anh trai cậu đồng thời cũng là tuyển thủ của đội tuyển quốc gia Nhật Bản nhận ra được. Mọi chuyện ngày càng phức tạp hơn khi Seven - một người bạn thời thơ ấu mà Kakeru đem lòng yêu mến xuất hiện...',390,4.8,'2023-12-02','2023-12-02',1),('B_029','Naruto',0,'US_002','sdfrer454676.jpg','Naruto là một cậu bé có mơ ước trở thành hokage của làng Konoha,được Hokage phong ấn trong người một trong 9 quái vật của thể giới : Cửu vĩ Hồ ly.Vì cho cậu là một con quái vật, ko ai dám chơi với cậu!',440,4.1,'2023-12-02','2023-12-02',1),('B_030','Katsu!',0,'US_001','sdjnejfjefueijrwijewije83u4jeo2.jpg','Ờ thì trong một thành phố nào đó ở Nhật, có một chàng trai tình cờ gặp được một cô gái xinh đẹp. Do phải lòng nàng, chàng đã đăng kí vào một phòng tập boxing do cha nàng làm chủ, nhưng không may thay là cha mẹ nàng đã ly hôn còn nàng thì lại cực kì ghét boxing. Rồi chuyện tình éo le của đôi \"uyên ương\" này sẽ về đâu?',688,4.5,'2023-12-02','2023-12-02',1);
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
INSERT INTO `comicbooks_genres` VALUES ('GR_02','B_001'),('GR_03','B_001'),('GR_02','B_002'),('GR_05','B_002'),('GR_06','B_002'),('GR_01','B_003'),('GR_04','B_003'),('GR_07','B_004'),('GR_08','B_005'),('GR_09','B_005'),('GR_05','B_006'),('GR_10','B_006'),('GR_05','B_007'),('GR_10','B_007'),('GR_01','B_008'),('GR_08','B_008'),('GR_02','B_009'),('GR_07','B_009'),('GR_04','B_010'),('GR_10','B_010'),('GR_08','B_011'),('GR_09','B_011'),('GR_03','B_012'),('GR_10','B_012'),('GR_06','B_013'),('GR_07','B_013'),('GR_09','B_013'),('GR_01','B_014'),('GR_02','B_014'),('GR_03','B_015'),('GR_07','B_015'),('GR_08','B_015'),('GR_05','B_016'),('GR_06','B_016'),('GR_01','B_017'),('GR_04','B_017'),('GR_02','B_018'),('GR_03','B_018'),('GR_09','B_019'),('GR_10','B_019'),('GR_03','B_020'),('GR_05','B_020'),('GR_02','B_021'),('GR_03','B_021'),('GR_04','B_021'),('GR_05','B_022'),('GR_07','B_022'),('GR_08','B_022'),('GR_02','B_023'),('GR_09','B_023'),('GR_04','B_024'),('GR_05','B_024'),('GR_06','B_024'),('GR_01','B_025'),('GR_05','B_025'),('GR_06','B_025'),('GR_07','B_025'),('GR_10','B_025'),('GR_02','B_026'),('GR_08','B_026'),('GR_10','B_026'),('GR_03','B_027'),('GR_08','B_027'),('GR_03','B_028'),('GR_10','B_028'),('GR_02','B_029'),('GR_05','B_029'),('GR_01','B_030'),('GR_07','B_030');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'US_001','CH_001','2023-12-03 17:00:00.000000','Hay quá, hóng chap sau!'),(2,'US_002','CH_001','2023-12-03 17:00:00.000000','Conan đẹp trai quáaa'),(3,'US_001','CH_001','2023-12-04 14:19:13.821000','Perfect'),(4,'US_002','CH_001','2023-12-04 14:24:59.404000','Tại sao conan bị teo nhỏ vậy?'),(5,'US_002','CH_001','2023-12-04 14:34:21.833000','Amazing gút chóp'),(6,'US_002','CH_001','2023-12-04 14:34:55.459000','Truyện đi vào lòng người'),(7,'US_002','CH_001','2023-12-04 15:18:19.105000','10 diem khong co nhung');
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
) ENGINE=InnoDB AUTO_INCREMENT=3153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_increase_view`
--

LOCK TABLES `history_increase_view` WRITE;
/*!40000 ALTER TABLE `history_increase_view` DISABLE KEYS */;
INSERT INTO `history_increase_view` VALUES (1,'B_002','2023-12-04'),(2,'B_003','2023-12-04'),(3,'B_003','2023-12-04'),(4,'B_004','2023-12-04'),(5,'B_005','2023-12-04'),(6,'B_002','2023-12-04'),(7,'B_004','2023-12-04'),(8,'B_006','2023-12-04'),(9,'B_008','2023-12-04'),(10,'B_001','2023-12-04'),(11,'B_008','2023-12-04'),(12,'B_009','2023-12-04'),(13,'B_012','2023-12-04'),(14,'B_014','2023-12-04'),(15,'B_016','2023-12-04'),(16,'B_019','2023-12-04'),(17,'B_023','2023-12-04'),(18,'B_005','2023-12-04'),(19,'B_007','2023-12-04'),(20,'B_003','2023-12-04'),(21,'B_001','2023-12-04'),(22,'B_004','2023-12-04'),(23,'B_009','2023-12-04'),(24,'B_010','2023-12-04'),(25,'B_011','2023-12-04'),(26,'B_015','2023-12-04'),(27,'B_009','2023-12-04'),(28,'B_002','2023-12-04'),(29,'B_009','2023-12-04'),(30,'B_005','2023-12-04'),(31,'B_004','2023-12-04'),(32,'B_002','2023-12-04'),(33,'B_008','2023-12-04'),(34,'B_016','2023-12-04'),(35,'B_019','2023-12-04'),(36,'B_022','2023-12-04'),(37,'B_025','2023-12-04'),(38,'B_030','2023-12-04'),(39,'B_011','2023-12-04'),(40,'B_006','2023-12-04'),(41,'B_008','2023-12-04'),(42,'B_003','2023-12-04'),(43,'B_003','2023-12-04'),(44,'B_017','2023-12-04'),(45,'B_008','2023-12-04'),(46,'B_019','2023-12-04'),(47,'B_007','2023-12-04'),(48,'B_003','2023-12-04'),(49,'B_013','2023-12-04'),(50,'B_016','2023-12-04'),(51,'B_006','2023-12-04'),(52,'B_016','2023-12-04'),(53,'B_030','2023-12-04'),(56,'B_016','2023-12-04'),(60,'B_027','2023-12-04'),(61,'B_028','2023-12-04'),(62,'B_029','2023-12-04'),(63,'B_030','2023-12-04'),(64,'B_001','2023-12-04'),(65,'B_002','2023-12-04'),(66,'B_003','2023-12-04'),(67,'B_008','2023-12-04'),(68,'B_002','2023-12-04'),(69,'B_004','2023-12-04'),(70,'B_016','2023-12-04'),(71,'B_027','2023-12-04'),(72,'B_009','2023-12-04'),(73,'B_028','2023-12-04'),(74,'B_029','2023-12-04'),(79,'B_008','2023-12-04'),(84,'B_027','2023-12-04'),(90,'B_003','2023-12-04'),(94,'B_009','2023-12-04'),(100,'B_001','2023-12-04'),(101,'B_002','2023-12-04'),(104,'B_030','2023-12-04'),(108,'B_027','2023-12-04'),(109,'B_030','2023-12-04'),(110,'B_001','2023-12-04'),(114,'B_008','2023-12-04'),(117,'B_016','2023-12-04'),(121,'B_008','2023-12-04'),(124,'B_016','2023-12-04'),(126,'B_027','2023-12-04'),(137,'B_002','2023-12-04'),(138,'B_003','2023-12-04'),(139,'B_008','2023-12-04'),(148,'B_009','2023-12-04'),(150,'B_027','2023-12-04'),(157,'B_028','2023-12-04'),(158,'B_029','2023-12-04'),(163,'B_003','2023-12-04'),(168,'B_008','2023-12-04'),(169,'B_003','2023-12-04'),(174,'B_027','2023-12-04'),(181,'B_028','2023-12-04'),(185,'B_002','2023-12-04'),(187,'B_003','2023-12-04'),(190,'B_027','2023-12-04'),(196,'B_009','2023-12-04'),(197,'B_027','2023-12-04'),(198,'B_008','2023-12-04'),(204,'B_003','2023-12-04'),(205,'B_008','2023-12-04'),(207,'B_009','2023-12-04'),(209,'B_016','2023-12-04'),(211,'B_028','2023-12-04'),(215,'B_002','2023-12-04'),(216,'B_027','2023-12-04'),(222,'B_008','2023-12-04'),(224,'B_027','2023-12-04'),(226,'B_016','2023-12-04'),(227,'B_027','2023-12-04'),(233,'B_003','2023-12-04'),(238,'B_002','2023-12-04'),(241,'B_028','2023-12-04'),(243,'B_030','2023-12-04'),(248,'B_003','2023-12-04'),(252,'B_027','2023-12-04'),(253,'B_028','2023-12-04'),(257,'B_002','2023-12-04'),(259,'B_003','2023-12-04'),(261,'B_002','2023-12-04'),(266,'B_029','2023-12-04'),(270,'B_003','2023-12-04'),(271,'B_008','2023-12-04'),(282,'B_003','2023-12-04'),(287,'B_009','2023-12-04'),(293,'B_002','2023-12-04'),(294,'B_003','2023-12-04'),(297,'B_002','2023-12-04'),(302,'B_029','2023-12-04'),(303,'B_030','2023-12-04'),(304,'B_001','2023-12-04'),(306,'B_003','2023-12-04'),(312,'B_027','2023-12-04'),(313,'B_028','2023-12-04'),(317,'B_002','2023-12-04'),(318,'B_003','2023-12-04'),(322,'B_016','2023-12-04'),(324,'B_027','2023-12-04'),(330,'B_003','2023-12-04'),(332,'B_027','2023-12-04'),(333,'B_003','2023-12-04'),(334,'B_027','2023-12-04'),(335,'B_003','2023-12-04'),(336,'B_027','2023-12-04'),(337,'B_003','2023-12-04'),(338,'B_027','2023-12-04'),(339,'B_003','2023-12-04'),(340,'B_027','2023-12-04'),(341,'B_003','2023-12-04'),(342,'B_027','2023-12-04'),(343,'B_003','2023-12-04'),(344,'B_027','2023-12-04'),(345,'B_003','2023-12-04'),(346,'B_027','2023-12-04'),(347,'B_003','2023-12-04'),(348,'B_027','2023-12-04'),(349,'B_003','2023-12-04'),(350,'B_027','2023-12-04'),(351,'B_003','2023-12-04'),(352,'B_027','2023-12-04'),(353,'B_003','2023-12-04'),(354,'B_027','2023-12-04'),(355,'B_003','2023-12-04'),(356,'B_027','2023-12-04'),(357,'B_003','2023-12-04'),(358,'B_027','2023-12-04'),(359,'B_003','2023-12-04'),(360,'B_027','2023-12-04'),(361,'B_003','2023-12-04'),(362,'B_027','2023-12-04'),(363,'B_003','2023-12-04'),(364,'B_027','2023-12-04'),(365,'B_003','2023-12-04'),(366,'B_027','2023-12-04'),(367,'B_003','2023-12-04'),(368,'B_027','2023-12-04'),(369,'B_003','2023-12-04'),(370,'B_027','2023-12-04'),(371,'B_003','2023-12-04'),(372,'B_027','2023-12-04'),(373,'B_003','2023-12-04'),(374,'B_027','2023-12-04'),(375,'B_003','2023-12-04'),(376,'B_027','2023-12-04'),(377,'B_003','2023-12-04'),(378,'B_027','2023-12-04'),(379,'B_003','2023-12-04'),(380,'B_027','2023-12-04'),(381,'B_003','2023-12-04'),(382,'B_027','2023-12-04'),(383,'B_003','2023-12-04'),(384,'B_027','2023-12-04'),(385,'B_003','2023-12-04'),(386,'B_027','2023-12-04'),(388,'B_027','2023-12-04'),(389,'B_027','2023-12-04'),(390,'B_027','2023-12-04'),(391,'B_027','2023-12-04'),(392,'B_027','2023-12-04'),(393,'B_027','2023-12-04'),(394,'B_027','2023-12-04'),(395,'B_027','2023-12-04'),(396,'B_027','2023-12-04'),(397,'B_027','2023-12-04'),(398,'B_027','2023-12-04'),(399,'B_027','2023-12-04'),(400,'B_027','2023-12-04'),(401,'B_027','2023-12-04'),(402,'B_027','2023-12-04'),(403,'B_027','2023-12-04'),(404,'B_027','2023-12-04'),(405,'B_027','2023-12-04'),(406,'B_027','2023-12-04'),(407,'B_027','2023-12-04'),(410,'B_029','2023-12-04'),(415,'B_027','2023-12-04'),(417,'B_030','2023-12-04'),(421,'B_027','2023-12-04'),(426,'B_027','2023-12-04'),(427,'B_003','2023-12-04'),(430,'B_016','2023-12-04'),(434,'B_030','2023-12-04'),(438,'B_030','2023-12-04'),(439,'B_030','2023-12-04'),(440,'B_030','2023-12-04'),(441,'B_030','2023-12-04'),(442,'B_030','2023-12-04'),(443,'B_030','2023-12-04'),(444,'B_030','2023-12-04'),(445,'B_030','2023-12-04'),(446,'B_030','2023-12-04'),(447,'B_030','2023-12-04'),(448,'B_030','2023-12-04'),(449,'B_030','2023-12-04'),(450,'B_030','2023-12-04'),(451,'B_030','2023-12-04'),(452,'B_030','2023-12-04'),(453,'B_030','2023-12-04'),(454,'B_030','2023-12-04'),(455,'B_030','2023-12-04'),(456,'B_030','2023-12-04'),(457,'B_030','2023-12-04'),(458,'B_030','2023-12-04'),(459,'B_030','2023-12-04'),(460,'B_030','2023-12-04'),(461,'B_030','2023-12-04'),(462,'B_030','2023-12-04'),(463,'B_030','2023-12-04'),(464,'B_030','2023-12-04'),(465,'B_030','2023-12-04'),(466,'B_030','2023-12-04'),(467,'B_030','2023-12-04'),(468,'B_030','2023-12-04'),(469,'B_030','2023-12-04'),(470,'B_030','2023-12-04'),(471,'B_030','2023-12-04'),(472,'B_030','2023-12-04'),(473,'B_030','2023-12-04'),(474,'B_030','2023-12-04'),(475,'B_030','2023-12-04'),(476,'B_030','2023-12-04'),(477,'B_030','2023-12-04'),(478,'B_030','2023-12-04'),(479,'B_030','2023-12-04'),(480,'B_030','2023-12-04'),(481,'B_030','2023-12-04'),(482,'B_030','2023-12-04'),(483,'B_030','2023-12-04'),(484,'B_030','2023-12-04'),(485,'B_030','2023-12-04'),(486,'B_030','2023-12-04'),(487,'B_030','2023-12-04'),(488,'B_030','2023-12-04'),(489,'B_030','2023-12-04'),(490,'B_030','2023-12-04'),(491,'B_030','2023-12-04'),(492,'B_030','2023-12-04'),(493,'B_030','2023-12-04'),(494,'B_030','2023-12-04'),(495,'B_030','2023-12-04'),(496,'B_030','2023-12-04'),(497,'B_030','2023-12-04'),(498,'B_030','2023-12-04'),(499,'B_030','2023-12-04'),(500,'B_030','2023-12-04'),(501,'B_030','2023-12-04'),(502,'B_030','2023-12-04'),(503,'B_030','2023-12-04'),(504,'B_030','2023-12-04'),(505,'B_030','2023-12-04'),(506,'B_030','2023-12-04'),(507,'B_030','2023-12-04'),(508,'B_030','2023-12-04'),(509,'B_030','2023-12-04'),(510,'B_030','2023-12-04'),(511,'B_030','2023-12-04'),(512,'B_030','2023-12-04'),(513,'B_030','2023-12-04'),(514,'B_030','2023-12-04'),(515,'B_030','2023-12-04'),(516,'B_030','2023-12-04'),(517,'B_030','2023-12-04'),(518,'B_030','2023-12-04'),(519,'B_030','2023-12-04'),(520,'B_030','2023-12-04'),(521,'B_030','2023-12-04'),(522,'B_030','2023-12-04'),(523,'B_030','2023-12-04'),(524,'B_030','2023-12-04'),(525,'B_030','2023-12-04'),(526,'B_030','2023-12-04'),(527,'B_030','2023-12-04'),(528,'B_030','2023-12-04'),(529,'B_030','2023-12-04'),(530,'B_030','2023-12-04'),(531,'B_030','2023-12-04'),(532,'B_030','2023-12-04'),(533,'B_030','2023-12-04'),(534,'B_030','2023-12-04'),(535,'B_030','2023-12-04'),(536,'B_030','2023-12-04'),(537,'B_030','2023-12-04'),(538,'B_030','2023-12-04'),(539,'B_030','2023-12-04'),(540,'B_030','2023-12-04'),(541,'B_030','2023-12-04'),(542,'B_030','2023-12-04'),(543,'B_030','2023-12-04'),(544,'B_030','2023-12-04'),(545,'B_030','2023-12-04'),(546,'B_030','2023-12-04'),(547,'B_030','2023-12-04'),(548,'B_030','2023-12-04'),(549,'B_030','2023-12-04'),(550,'B_030','2023-12-04'),(551,'B_030','2023-12-04'),(552,'B_030','2023-12-04'),(553,'B_030','2023-12-04'),(554,'B_030','2023-12-04'),(555,'B_030','2023-12-04'),(556,'B_030','2023-12-04'),(557,'B_030','2023-12-04'),(558,'B_030','2023-12-04'),(559,'B_030','2023-12-04'),(560,'B_030','2023-12-04'),(561,'B_030','2023-12-04'),(562,'B_030','2023-12-04'),(563,'B_030','2023-12-04'),(564,'B_030','2023-12-04'),(565,'B_030','2023-12-04'),(566,'B_030','2023-12-04'),(567,'B_030','2023-12-04'),(568,'B_030','2023-12-04'),(569,'B_030','2023-12-04'),(570,'B_030','2023-12-04'),(571,'B_030','2023-12-04'),(572,'B_030','2023-12-04'),(573,'B_030','2023-12-04'),(574,'B_030','2023-12-04'),(575,'B_030','2023-12-04'),(576,'B_030','2023-12-04'),(577,'B_030','2023-12-04'),(578,'B_030','2023-12-04'),(579,'B_030','2023-12-04'),(580,'B_030','2023-12-04'),(581,'B_030','2023-12-04'),(582,'B_030','2023-12-04'),(583,'B_030','2023-12-04'),(584,'B_030','2023-12-04'),(585,'B_030','2023-12-04'),(586,'B_030','2023-12-04'),(587,'B_030','2023-12-04'),(588,'B_030','2023-12-04'),(589,'B_030','2023-12-04'),(590,'B_030','2023-12-04'),(591,'B_030','2023-12-04'),(592,'B_030','2023-12-04'),(593,'B_030','2023-12-04'),(594,'B_030','2023-12-04'),(595,'B_030','2023-12-04'),(596,'B_030','2023-12-04'),(597,'B_030','2023-12-04'),(598,'B_030','2023-12-04'),(599,'B_030','2023-12-04'),(600,'B_030','2023-12-04'),(601,'B_030','2023-12-04'),(602,'B_030','2023-12-04'),(603,'B_030','2023-12-04'),(604,'B_030','2023-12-04'),(605,'B_030','2023-12-04'),(606,'B_030','2023-12-04'),(607,'B_030','2023-12-04'),(608,'B_030','2023-12-04'),(609,'B_030','2023-12-04'),(610,'B_030','2023-12-04'),(611,'B_030','2023-12-04'),(612,'B_030','2023-12-04'),(613,'B_030','2023-12-04'),(614,'B_030','2023-12-04'),(615,'B_030','2023-12-04'),(616,'B_030','2023-12-04'),(617,'B_030','2023-12-04'),(618,'B_030','2023-12-04'),(619,'B_030','2023-12-04'),(620,'B_030','2023-12-04'),(621,'B_030','2023-12-04'),(622,'B_030','2023-12-04'),(623,'B_030','2023-12-04'),(624,'B_030','2023-12-04'),(625,'B_030','2023-12-04'),(626,'B_030','2023-12-04'),(627,'B_030','2023-12-04'),(628,'B_030','2023-12-04'),(629,'B_030','2023-12-04'),(630,'B_030','2023-12-04'),(631,'B_030','2023-12-04'),(632,'B_030','2023-12-04'),(633,'B_030','2023-12-04'),(634,'B_030','2023-12-04'),(635,'B_030','2023-12-04'),(636,'B_030','2023-12-04'),(637,'B_030','2023-12-04'),(638,'B_030','2023-12-04'),(639,'B_030','2023-12-04'),(640,'B_030','2023-12-04'),(641,'B_030','2023-12-04'),(642,'B_030','2023-12-04'),(643,'B_030','2023-12-04'),(644,'B_030','2023-12-04'),(645,'B_030','2023-12-04'),(646,'B_030','2023-12-04'),(647,'B_030','2023-12-04'),(648,'B_030','2023-12-04'),(649,'B_030','2023-12-04'),(650,'B_030','2023-12-04'),(651,'B_030','2023-12-04'),(652,'B_030','2023-12-04'),(653,'B_030','2023-12-04'),(654,'B_030','2023-12-04'),(655,'B_030','2023-12-04'),(656,'B_030','2023-12-04'),(657,'B_030','2023-12-04'),(658,'B_030','2023-12-04'),(659,'B_030','2023-12-04'),(660,'B_030','2023-12-04'),(661,'B_030','2023-12-04'),(662,'B_030','2023-12-04'),(663,'B_030','2023-12-04'),(664,'B_030','2023-12-04'),(665,'B_030','2023-12-04'),(666,'B_030','2023-12-04'),(667,'B_030','2023-12-04'),(668,'B_030','2023-12-04'),(669,'B_030','2023-12-04'),(670,'B_030','2023-12-04'),(671,'B_030','2023-12-04'),(672,'B_030','2023-12-04'),(673,'B_030','2023-12-04'),(674,'B_030','2023-12-04'),(675,'B_030','2023-12-04'),(676,'B_030','2023-12-04'),(677,'B_030','2023-12-04'),(678,'B_030','2023-12-04'),(679,'B_030','2023-12-04'),(680,'B_030','2023-12-04'),(681,'B_030','2023-12-04'),(682,'B_030','2023-12-04'),(683,'B_030','2023-12-04'),(684,'B_030','2023-12-04'),(685,'B_030','2023-12-04'),(686,'B_030','2023-12-04'),(687,'B_030','2023-12-04'),(688,'B_030','2023-12-04'),(689,'B_030','2023-12-04'),(690,'B_030','2023-12-04'),(691,'B_030','2023-12-04'),(692,'B_030','2023-12-04'),(693,'B_030','2023-12-04'),(694,'B_030','2023-12-04'),(695,'B_030','2023-12-04'),(696,'B_030','2023-12-04'),(697,'B_030','2023-12-04'),(698,'B_030','2023-12-04'),(699,'B_030','2023-12-04'),(700,'B_030','2023-12-04'),(701,'B_030','2023-12-04'),(702,'B_030','2023-12-04'),(703,'B_030','2023-12-04'),(704,'B_030','2023-12-04'),(705,'B_030','2023-12-04'),(706,'B_030','2023-12-04'),(707,'B_030','2023-12-04'),(708,'B_030','2023-12-04'),(709,'B_030','2023-12-04'),(710,'B_030','2023-12-04'),(711,'B_030','2023-12-04'),(712,'B_030','2023-12-04'),(713,'B_030','2023-12-04'),(714,'B_030','2023-12-04'),(715,'B_030','2023-12-04'),(716,'B_030','2023-12-04'),(717,'B_030','2023-12-04'),(718,'B_030','2023-12-04'),(719,'B_030','2023-12-04'),(720,'B_030','2023-12-04'),(721,'B_030','2023-12-04'),(722,'B_030','2023-12-04'),(723,'B_030','2023-12-04'),(724,'B_030','2023-12-04'),(725,'B_030','2023-12-04'),(726,'B_030','2023-12-04'),(727,'B_030','2023-12-04'),(728,'B_030','2023-12-04'),(729,'B_030','2023-12-04'),(730,'B_030','2023-12-04'),(731,'B_030','2023-12-04'),(732,'B_030','2023-12-04'),(733,'B_030','2023-12-04'),(734,'B_030','2023-12-04'),(735,'B_030','2023-12-04'),(736,'B_030','2023-12-04'),(737,'B_030','2023-12-04'),(738,'B_030','2023-12-04'),(739,'B_030','2023-12-04'),(740,'B_030','2023-12-04'),(741,'B_030','2023-12-04'),(742,'B_030','2023-12-04'),(743,'B_030','2023-12-04'),(744,'B_030','2023-12-04'),(745,'B_030','2023-12-04'),(746,'B_030','2023-12-04'),(747,'B_030','2023-12-04'),(748,'B_030','2023-12-04'),(749,'B_030','2023-12-04'),(750,'B_030','2023-12-04'),(751,'B_030','2023-12-04'),(752,'B_030','2023-12-04'),(753,'B_030','2023-12-04'),(754,'B_030','2023-12-04'),(755,'B_030','2023-12-04'),(756,'B_030','2023-12-04'),(757,'B_030','2023-12-04'),(758,'B_030','2023-12-04'),(759,'B_030','2023-12-04'),(760,'B_030','2023-12-04'),(761,'B_030','2023-12-04'),(762,'B_030','2023-12-04'),(763,'B_030','2023-12-04'),(764,'B_030','2023-12-04'),(765,'B_030','2023-12-04'),(766,'B_030','2023-12-04'),(767,'B_030','2023-12-04'),(768,'B_030','2023-12-04'),(769,'B_030','2023-12-04'),(770,'B_030','2023-12-04'),(771,'B_030','2023-12-04'),(772,'B_030','2023-12-04'),(773,'B_030','2023-12-04'),(774,'B_030','2023-12-04'),(775,'B_030','2023-12-04'),(776,'B_030','2023-12-04'),(777,'B_030','2023-12-04'),(778,'B_030','2023-12-04'),(779,'B_030','2023-12-04'),(780,'B_030','2023-12-04'),(781,'B_030','2023-12-04'),(782,'B_030','2023-12-04'),(783,'B_030','2023-12-04'),(784,'B_030','2023-12-04'),(785,'B_030','2023-12-04'),(786,'B_030','2023-12-04'),(787,'B_030','2023-12-04'),(788,'B_030','2023-12-04'),(789,'B_030','2023-12-04'),(790,'B_030','2023-12-04'),(791,'B_030','2023-12-04'),(792,'B_030','2023-12-04'),(793,'B_030','2023-12-04'),(794,'B_030','2023-12-04'),(795,'B_030','2023-12-04'),(796,'B_030','2023-12-04'),(797,'B_030','2023-12-04'),(798,'B_030','2023-12-04'),(799,'B_030','2023-12-04'),(800,'B_030','2023-12-04'),(801,'B_030','2023-12-04'),(802,'B_030','2023-12-04'),(803,'B_030','2023-12-04'),(804,'B_030','2023-12-04'),(805,'B_030','2023-12-04'),(806,'B_030','2023-12-04'),(807,'B_030','2023-12-04'),(808,'B_030','2023-12-04'),(809,'B_030','2023-12-04'),(810,'B_030','2023-12-04'),(811,'B_030','2023-12-04'),(812,'B_030','2023-12-04'),(813,'B_030','2023-12-04'),(814,'B_030','2023-12-04'),(815,'B_030','2023-12-04'),(816,'B_030','2023-12-04'),(817,'B_030','2023-12-04'),(818,'B_030','2023-12-04'),(819,'B_030','2023-12-04'),(820,'B_030','2023-12-04'),(821,'B_030','2023-12-04'),(822,'B_030','2023-12-04'),(823,'B_030','2023-12-04'),(824,'B_030','2023-12-04'),(825,'B_030','2023-12-04'),(826,'B_030','2023-12-04'),(827,'B_030','2023-12-04'),(828,'B_030','2023-12-04'),(829,'B_030','2023-12-04'),(830,'B_030','2023-12-04'),(831,'B_030','2023-12-04'),(832,'B_030','2023-12-04'),(833,'B_030','2023-12-04'),(834,'B_030','2023-12-04'),(835,'B_030','2023-12-04'),(836,'B_030','2023-12-04'),(837,'B_030','2023-12-04'),(838,'B_030','2023-12-04'),(839,'B_030','2023-12-04'),(840,'B_030','2023-12-04'),(841,'B_030','2023-12-04'),(842,'B_030','2023-12-04'),(843,'B_030','2023-12-04'),(844,'B_027','2023-12-04'),(845,'B_028','2023-12-04'),(846,'B_029','2023-12-04'),(852,'B_001','2023-12-04'),(859,'B_002','2023-12-04'),(863,'B_027','2023-12-04'),(869,'B_028','2023-12-04'),(873,'B_027','2023-12-04'),(874,'B_028','2023-12-04'),(875,'B_027','2023-12-04'),(876,'B_028','2023-12-04'),(877,'B_027','2023-12-04'),(878,'B_028','2023-12-04'),(879,'B_027','2023-12-04'),(880,'B_028','2023-12-04'),(881,'B_027','2023-12-04'),(882,'B_028','2023-12-04'),(883,'B_027','2023-12-04'),(884,'B_028','2023-12-04'),(885,'B_027','2023-12-04'),(886,'B_028','2023-12-04'),(887,'B_027','2023-12-04'),(888,'B_028','2023-12-04'),(889,'B_027','2023-12-04'),(890,'B_028','2023-12-04'),(891,'B_027','2023-12-04'),(892,'B_028','2023-12-04'),(893,'B_027','2023-12-04'),(895,'B_027','2023-12-04'),(896,'B_027','2023-12-04'),(897,'B_027','2023-12-04'),(898,'B_027','2023-12-04'),(899,'B_027','2023-12-04'),(900,'B_027','2023-12-04'),(901,'B_027','2023-12-04'),(902,'B_027','2023-12-04'),(903,'B_027','2023-12-04'),(904,'B_027','2023-12-04'),(905,'B_027','2023-12-04'),(906,'B_027','2023-12-04'),(907,'B_027','2023-12-04'),(908,'B_027','2023-12-04'),(909,'B_027','2023-12-04'),(910,'B_027','2023-12-04'),(911,'B_027','2023-12-04'),(912,'B_027','2023-12-04'),(913,'B_027','2023-12-04'),(914,'B_027','2023-12-04'),(915,'B_027','2023-12-04'),(916,'B_027','2023-12-04'),(917,'B_027','2023-12-04'),(918,'B_027','2023-12-04'),(919,'B_027','2023-12-04'),(920,'B_027','2023-12-04'),(921,'B_027','2023-12-04'),(922,'B_027','2023-12-04'),(923,'B_027','2023-12-04'),(924,'B_027','2023-12-04'),(925,'B_027','2023-12-04'),(926,'B_027','2023-12-04'),(927,'B_027','2023-12-04'),(928,'B_027','2023-12-04'),(929,'B_027','2023-12-04'),(930,'B_027','2023-12-04'),(931,'B_027','2023-12-04'),(932,'B_027','2023-12-04'),(933,'B_027','2023-12-04'),(934,'B_027','2023-12-04'),(935,'B_027','2023-12-04'),(936,'B_027','2023-12-04'),(937,'B_027','2023-12-04'),(938,'B_027','2023-12-04'),(939,'B_027','2023-12-04'),(940,'B_027','2023-12-04'),(941,'B_027','2023-12-04'),(942,'B_027','2023-12-04'),(943,'B_027','2023-12-04'),(944,'B_027','2023-12-04'),(945,'B_027','2023-12-04'),(946,'B_027','2023-12-04'),(947,'B_027','2023-12-04'),(948,'B_027','2023-12-04'),(949,'B_027','2023-12-04'),(950,'B_027','2023-12-04'),(951,'B_027','2023-12-04'),(952,'B_027','2023-12-04'),(953,'B_027','2023-12-04'),(954,'B_027','2023-12-04'),(955,'B_027','2023-12-04'),(956,'B_027','2023-12-04'),(957,'B_027','2023-12-04'),(958,'B_027','2023-12-04'),(959,'B_027','2023-12-04'),(960,'B_027','2023-12-04'),(961,'B_027','2023-12-04'),(962,'B_027','2023-12-04'),(963,'B_027','2023-12-04'),(964,'B_027','2023-12-04'),(965,'B_027','2023-12-04'),(966,'B_027','2023-12-04'),(967,'B_027','2023-12-04'),(968,'B_027','2023-12-04'),(969,'B_027','2023-12-04'),(970,'B_027','2023-12-04'),(971,'B_027','2023-12-04'),(972,'B_027','2023-12-04'),(973,'B_027','2023-12-04'),(974,'B_027','2023-12-04'),(975,'B_027','2023-12-04'),(976,'B_027','2023-12-04'),(977,'B_027','2023-12-04'),(978,'B_027','2023-12-04'),(979,'B_027','2023-12-04'),(980,'B_027','2023-12-04'),(981,'B_027','2023-12-04'),(982,'B_027','2023-12-04'),(983,'B_027','2023-12-04'),(984,'B_027','2023-12-04'),(985,'B_027','2023-12-04'),(986,'B_027','2023-12-04'),(987,'B_027','2023-12-04'),(988,'B_027','2023-12-04'),(989,'B_027','2023-12-04'),(990,'B_027','2023-12-04'),(991,'B_027','2023-12-04'),(992,'B_027','2023-12-04'),(993,'B_027','2023-12-04'),(994,'B_027','2023-12-04'),(995,'B_027','2023-12-04'),(996,'B_027','2023-12-04'),(997,'B_027','2023-12-04'),(998,'B_027','2023-12-04'),(999,'B_027','2023-12-04'),(1000,'B_027','2023-12-04'),(1001,'B_027','2023-12-04'),(1002,'B_027','2023-12-04'),(1003,'B_027','2023-12-04'),(1004,'B_027','2023-12-04'),(1005,'B_027','2023-12-04'),(1006,'B_027','2023-12-04'),(1007,'B_027','2023-12-04'),(1008,'B_027','2023-12-04'),(1009,'B_027','2023-12-04'),(1010,'B_027','2023-12-04'),(1011,'B_027','2023-12-04'),(1012,'B_027','2023-12-04'),(1013,'B_027','2023-12-04'),(1014,'B_027','2023-12-04'),(1015,'B_027','2023-12-04'),(1016,'B_027','2023-12-04'),(1017,'B_027','2023-12-04'),(1018,'B_027','2023-12-04'),(1019,'B_027','2023-12-04'),(1020,'B_027','2023-12-04'),(1021,'B_027','2023-12-04'),(1022,'B_027','2023-12-04'),(1023,'B_027','2023-12-04'),(1024,'B_027','2023-12-04'),(1025,'B_027','2023-12-04'),(1026,'B_027','2023-12-04'),(1027,'B_027','2023-12-04'),(1028,'B_027','2023-12-04'),(1029,'B_027','2023-12-04'),(1030,'B_027','2023-12-04'),(1031,'B_027','2023-12-04'),(1032,'B_027','2023-12-04'),(1033,'B_027','2023-12-04'),(1034,'B_027','2023-12-04'),(1035,'B_027','2023-12-04'),(1036,'B_027','2023-12-04'),(1037,'B_027','2023-12-04'),(1038,'B_027','2023-12-04'),(1039,'B_027','2023-12-04'),(1040,'B_027','2023-12-04'),(1041,'B_027','2023-12-04'),(1042,'B_027','2023-12-04'),(1043,'B_027','2023-12-04'),(1044,'B_027','2023-12-04'),(1045,'B_027','2023-12-04'),(1046,'B_027','2023-12-04'),(1047,'B_027','2023-12-04'),(1048,'B_027','2023-12-04'),(1049,'B_027','2023-12-04'),(1050,'B_027','2023-12-04'),(1051,'B_027','2023-12-04'),(1052,'B_027','2023-12-04'),(1053,'B_027','2023-12-04'),(1054,'B_027','2023-12-04'),(1055,'B_027','2023-12-04'),(1056,'B_027','2023-12-04'),(1057,'B_027','2023-12-04'),(1058,'B_027','2023-12-04'),(1059,'B_027','2023-12-04'),(1060,'B_027','2023-12-04'),(1061,'B_027','2023-12-04'),(1062,'B_027','2023-12-04'),(1063,'B_027','2023-12-04'),(1064,'B_027','2023-12-04'),(1065,'B_027','2023-12-04'),(1066,'B_027','2023-12-04'),(1067,'B_027','2023-12-04'),(1068,'B_027','2023-12-04'),(1069,'B_027','2023-12-04'),(1070,'B_027','2023-12-04'),(1071,'B_027','2023-12-04'),(1072,'B_027','2023-12-04'),(1073,'B_027','2023-12-04'),(1074,'B_027','2023-12-04'),(1075,'B_027','2023-12-04'),(1076,'B_027','2023-12-04'),(1077,'B_027','2023-12-04'),(1078,'B_027','2023-12-04'),(1079,'B_027','2023-12-04'),(1080,'B_027','2023-12-04'),(1081,'B_027','2023-12-04'),(1082,'B_027','2023-12-04'),(1083,'B_027','2023-12-04'),(1084,'B_027','2023-12-04'),(1085,'B_027','2023-12-04'),(1086,'B_027','2023-12-04'),(1087,'B_027','2023-12-04'),(1088,'B_027','2023-12-04'),(1089,'B_027','2023-12-04'),(1090,'B_027','2023-12-04'),(1091,'B_027','2023-12-04'),(1092,'B_027','2023-12-04'),(1093,'B_027','2023-12-04'),(1094,'B_027','2023-12-04'),(1095,'B_027','2023-12-04'),(1096,'B_027','2023-12-04'),(1097,'B_027','2023-12-04'),(1098,'B_027','2023-12-04'),(1099,'B_027','2023-12-04'),(1100,'B_027','2023-12-04'),(1101,'B_027','2023-12-04'),(1102,'B_027','2023-12-04'),(1103,'B_027','2023-12-04'),(1104,'B_027','2023-12-04'),(1105,'B_027','2023-12-04'),(1106,'B_027','2023-12-04'),(1107,'B_027','2023-12-04'),(1108,'B_027','2023-12-04'),(1109,'B_027','2023-12-04'),(1110,'B_027','2023-12-04'),(1111,'B_027','2023-12-04'),(1112,'B_027','2023-12-04'),(1113,'B_027','2023-12-04'),(1114,'B_027','2023-12-04'),(1115,'B_027','2023-12-04'),(1116,'B_027','2023-12-04'),(1117,'B_027','2023-12-04'),(1118,'B_027','2023-12-04'),(1119,'B_027','2023-12-04'),(1120,'B_027','2023-12-04'),(1121,'B_027','2023-12-04'),(1122,'B_027','2023-12-04'),(1123,'B_027','2023-12-04'),(1124,'B_027','2023-12-04'),(1125,'B_027','2023-12-04'),(1126,'B_027','2023-12-04'),(1127,'B_027','2023-12-04'),(1128,'B_027','2023-12-04'),(1129,'B_027','2023-12-04'),(1130,'B_027','2023-12-04'),(1131,'B_027','2023-12-04'),(1132,'B_027','2023-12-04'),(1133,'B_027','2023-12-04'),(1134,'B_027','2023-12-04'),(1135,'B_027','2023-12-04'),(1136,'B_027','2023-12-04'),(1137,'B_027','2023-12-04'),(1138,'B_027','2023-12-04'),(1139,'B_027','2023-12-04'),(1140,'B_027','2023-12-04'),(1141,'B_027','2023-12-04'),(1142,'B_027','2023-12-04'),(1143,'B_027','2023-12-04'),(1144,'B_027','2023-12-04'),(1145,'B_027','2023-12-04'),(1146,'B_027','2023-12-04'),(1147,'B_027','2023-12-04'),(1148,'B_027','2023-12-04'),(1149,'B_027','2023-12-04'),(1150,'B_027','2023-12-04'),(1151,'B_027','2023-12-04'),(1152,'B_027','2023-12-04'),(1153,'B_027','2023-12-04'),(1159,'B_027','2023-12-04'),(1168,'B_028','2023-12-04'),(1175,'B_002','2023-12-04'),(1179,'B_002','2023-12-04'),(1180,'B_002','2023-12-04'),(1181,'B_002','2023-12-04'),(1182,'B_002','2023-12-04'),(1183,'B_002','2023-12-04'),(1184,'B_002','2023-12-04'),(1185,'B_002','2023-12-04'),(1186,'B_002','2023-12-04'),(1187,'B_002','2023-12-04'),(1188,'B_002','2023-12-04'),(1189,'B_002','2023-12-04'),(1190,'B_002','2023-12-04'),(1191,'B_002','2023-12-04'),(1192,'B_002','2023-12-04'),(1193,'B_002','2023-12-04'),(1194,'B_002','2023-12-04'),(1195,'B_002','2023-12-04'),(1196,'B_002','2023-12-04'),(1197,'B_002','2023-12-04'),(1198,'B_002','2023-12-04'),(1199,'B_002','2023-12-04'),(1200,'B_002','2023-12-04'),(1201,'B_002','2023-12-04'),(1202,'B_002','2023-12-04'),(1203,'B_002','2023-12-04'),(1204,'B_002','2023-12-04'),(1205,'B_002','2023-12-04'),(1206,'B_002','2023-12-04'),(1207,'B_002','2023-12-04'),(1208,'B_002','2023-12-04'),(1209,'B_002','2023-12-04'),(1210,'B_002','2023-12-04'),(1211,'B_002','2023-12-04'),(1212,'B_002','2023-12-04'),(1213,'B_002','2023-12-04'),(1214,'B_002','2023-12-04'),(1215,'B_002','2023-12-04'),(1216,'B_002','2023-12-04'),(1217,'B_002','2023-12-04'),(1218,'B_002','2023-12-04'),(1219,'B_002','2023-12-04'),(1220,'B_002','2023-12-04'),(1221,'B_002','2023-12-04'),(1222,'B_002','2023-12-04'),(1223,'B_002','2023-12-04'),(1224,'B_002','2023-12-04'),(1225,'B_002','2023-12-04'),(1226,'B_002','2023-12-04'),(1227,'B_002','2023-12-04'),(1228,'B_002','2023-12-04'),(1229,'B_002','2023-12-04'),(1230,'B_002','2023-12-04'),(1231,'B_002','2023-12-04'),(1232,'B_002','2023-12-04'),(1233,'B_002','2023-12-04'),(1234,'B_002','2023-12-04'),(1235,'B_002','2023-12-04'),(1236,'B_002','2023-12-04'),(1237,'B_002','2023-12-04'),(1238,'B_002','2023-12-04'),(1239,'B_002','2023-12-04'),(1240,'B_002','2023-12-04'),(1241,'B_002','2023-12-04'),(1242,'B_002','2023-12-04'),(1243,'B_002','2023-12-04'),(1244,'B_002','2023-12-04'),(1245,'B_002','2023-12-04'),(1246,'B_002','2023-12-04'),(1247,'B_002','2023-12-04'),(1248,'B_002','2023-12-04'),(1249,'B_002','2023-12-04'),(1250,'B_002','2023-12-04'),(1251,'B_002','2023-12-04'),(1252,'B_002','2023-12-04'),(1253,'B_002','2023-12-04'),(1254,'B_002','2023-12-04'),(1255,'B_002','2023-12-04'),(1256,'B_002','2023-12-04'),(1257,'B_002','2023-12-04'),(1258,'B_002','2023-12-04'),(1259,'B_002','2023-12-04'),(1260,'B_002','2023-12-04'),(1261,'B_002','2023-12-04'),(1262,'B_002','2023-12-04'),(1263,'B_002','2023-12-04'),(1264,'B_002','2023-12-04'),(1265,'B_002','2023-12-04'),(1266,'B_002','2023-12-04'),(1267,'B_002','2023-12-04'),(1268,'B_002','2023-12-04'),(1269,'B_002','2023-12-04'),(1270,'B_002','2023-12-04'),(1271,'B_002','2023-12-04'),(1272,'B_002','2023-12-04'),(1273,'B_002','2023-12-04'),(1274,'B_002','2023-12-04'),(1275,'B_002','2023-12-04'),(1276,'B_002','2023-12-04'),(1277,'B_002','2023-12-04'),(1278,'B_002','2023-12-04'),(1279,'B_002','2023-12-04'),(1280,'B_002','2023-12-04'),(1281,'B_002','2023-12-04'),(1282,'B_002','2023-12-04'),(1283,'B_002','2023-12-04'),(1284,'B_002','2023-12-04'),(1285,'B_002','2023-12-04'),(1286,'B_002','2023-12-04'),(1287,'B_002','2023-12-04'),(1288,'B_002','2023-12-04'),(1289,'B_002','2023-12-04'),(1290,'B_002','2023-12-04'),(1291,'B_002','2023-12-04'),(1292,'B_002','2023-12-04'),(1293,'B_002','2023-12-04'),(1294,'B_002','2023-12-04'),(1295,'B_002','2023-12-04'),(1296,'B_002','2023-12-04'),(1297,'B_002','2023-12-04'),(1298,'B_002','2023-12-04'),(1299,'B_002','2023-12-04'),(1300,'B_002','2023-12-04'),(1301,'B_002','2023-12-04'),(1302,'B_002','2023-12-04'),(1303,'B_002','2023-12-04'),(1304,'B_002','2023-12-04'),(1305,'B_002','2023-12-04'),(1306,'B_002','2023-12-04'),(1307,'B_002','2023-12-04'),(1308,'B_002','2023-12-04'),(1309,'B_002','2023-12-04'),(1310,'B_002','2023-12-04'),(1311,'B_002','2023-12-04'),(1312,'B_002','2023-12-04'),(1313,'B_002','2023-12-04'),(1314,'B_002','2023-12-04'),(1315,'B_002','2023-12-04'),(1316,'B_002','2023-12-04'),(1317,'B_002','2023-12-04'),(1318,'B_002','2023-12-04'),(1319,'B_002','2023-12-04'),(1320,'B_002','2023-12-04'),(1321,'B_002','2023-12-04'),(1322,'B_002','2023-12-04'),(1323,'B_002','2023-12-04'),(1324,'B_002','2023-12-04'),(1325,'B_002','2023-12-04'),(1326,'B_002','2023-12-04'),(1327,'B_002','2023-12-04'),(1328,'B_002','2023-12-04'),(1329,'B_002','2023-12-04'),(1330,'B_002','2023-12-04'),(1331,'B_002','2023-12-04'),(1332,'B_002','2023-12-04'),(1333,'B_002','2023-12-04'),(1334,'B_002','2023-12-04'),(1335,'B_002','2023-12-04'),(1336,'B_002','2023-12-04'),(1337,'B_002','2023-12-04'),(1338,'B_002','2023-12-04'),(1339,'B_002','2023-12-04'),(1340,'B_002','2023-12-04'),(1341,'B_002','2023-12-04'),(1342,'B_002','2023-12-04'),(1343,'B_002','2023-12-04'),(1344,'B_002','2023-12-04'),(1345,'B_002','2023-12-04'),(1346,'B_002','2023-12-04'),(1347,'B_002','2023-12-04'),(1348,'B_002','2023-12-04'),(1349,'B_002','2023-12-04'),(1350,'B_002','2023-12-04'),(1351,'B_002','2023-12-04'),(1352,'B_002','2023-12-04'),(1353,'B_002','2023-12-04'),(1354,'B_002','2023-12-04'),(1355,'B_002','2023-12-04'),(1356,'B_002','2023-12-04'),(1357,'B_002','2023-12-04'),(1358,'B_002','2023-12-04'),(1359,'B_002','2023-12-04'),(1360,'B_002','2023-12-04'),(1361,'B_002','2023-12-04'),(1362,'B_002','2023-12-04'),(1363,'B_002','2023-12-04'),(1364,'B_002','2023-12-04'),(1365,'B_002','2023-12-04'),(1366,'B_002','2023-12-04'),(1367,'B_002','2023-12-04'),(1368,'B_002','2023-12-04'),(1369,'B_002','2023-12-04'),(1370,'B_002','2023-12-04'),(1371,'B_002','2023-12-04'),(1372,'B_002','2023-12-04'),(1373,'B_002','2023-12-04'),(1374,'B_002','2023-12-04'),(1375,'B_002','2023-12-04'),(1376,'B_002','2023-12-04'),(1377,'B_002','2023-12-04'),(1378,'B_002','2023-12-04'),(1379,'B_002','2023-12-04'),(1380,'B_002','2023-12-04'),(1381,'B_002','2023-12-04'),(1382,'B_002','2023-12-04'),(1383,'B_002','2023-12-04'),(1384,'B_002','2023-12-04'),(1385,'B_002','2023-12-04'),(1386,'B_002','2023-12-04'),(1387,'B_002','2023-12-04'),(1388,'B_002','2023-12-04'),(1389,'B_002','2023-12-04'),(1390,'B_002','2023-12-04'),(1391,'B_002','2023-12-04'),(1392,'B_002','2023-12-04'),(1393,'B_002','2023-12-04'),(1394,'B_002','2023-12-04'),(1395,'B_002','2023-12-04'),(1396,'B_002','2023-12-04'),(1397,'B_002','2023-12-04'),(1398,'B_002','2023-12-04'),(1399,'B_002','2023-12-04'),(1400,'B_002','2023-12-04'),(1401,'B_002','2023-12-04'),(1402,'B_002','2023-12-04'),(1403,'B_002','2023-12-04'),(1404,'B_002','2023-12-04'),(1405,'B_002','2023-12-04'),(1406,'B_002','2023-12-04'),(1407,'B_002','2023-12-04'),(1408,'B_002','2023-12-04'),(1409,'B_002','2023-12-04'),(1410,'B_002','2023-12-04'),(1411,'B_002','2023-12-04'),(1412,'B_002','2023-12-04'),(1413,'B_002','2023-12-04'),(1414,'B_002','2023-12-04'),(1415,'B_002','2023-12-04'),(1416,'B_002','2023-12-04'),(1417,'B_002','2023-12-04'),(1418,'B_002','2023-12-04'),(1419,'B_002','2023-12-04'),(1420,'B_002','2023-12-04'),(1421,'B_002','2023-12-04'),(1422,'B_002','2023-12-04'),(1423,'B_002','2023-12-04'),(1424,'B_002','2023-12-04'),(1425,'B_002','2023-12-04'),(1426,'B_002','2023-12-04'),(1427,'B_002','2023-12-04'),(1428,'B_002','2023-12-04'),(1429,'B_002','2023-12-04'),(1430,'B_002','2023-12-04'),(1431,'B_002','2023-12-04'),(1432,'B_002','2023-12-04'),(1433,'B_002','2023-12-04'),(1434,'B_002','2023-12-04'),(1435,'B_002','2023-12-04'),(1436,'B_002','2023-12-04'),(1437,'B_002','2023-12-04'),(1438,'B_002','2023-12-04'),(1439,'B_002','2023-12-04'),(1440,'B_002','2023-12-04'),(1441,'B_002','2023-12-04'),(1442,'B_002','2023-12-04'),(1443,'B_002','2023-12-04'),(1444,'B_002','2023-12-04'),(1445,'B_002','2023-12-04'),(1446,'B_002','2023-12-04'),(1447,'B_002','2023-12-04'),(1448,'B_002','2023-12-04'),(1449,'B_002','2023-12-04'),(1450,'B_002','2023-12-04'),(1451,'B_002','2023-12-04'),(1452,'B_002','2023-12-04'),(1453,'B_002','2023-12-04'),(1454,'B_002','2023-12-04'),(1455,'B_002','2023-12-04'),(1456,'B_002','2023-12-04'),(1457,'B_002','2023-12-04'),(1458,'B_002','2023-12-04'),(1459,'B_002','2023-12-04'),(1460,'B_002','2023-12-04'),(1461,'B_002','2023-12-04'),(1462,'B_002','2023-12-04'),(1463,'B_002','2023-12-04'),(1464,'B_002','2023-12-04'),(1465,'B_002','2023-12-04'),(1466,'B_002','2023-12-04'),(1467,'B_002','2023-12-04'),(1468,'B_002','2023-12-04'),(1469,'B_002','2023-12-04'),(1470,'B_002','2023-12-04'),(1471,'B_002','2023-12-04'),(1472,'B_002','2023-12-04'),(1473,'B_002','2023-12-04'),(1474,'B_002','2023-12-04'),(1475,'B_002','2023-12-04'),(1476,'B_002','2023-12-04'),(1477,'B_002','2023-12-04'),(1478,'B_002','2023-12-04'),(1479,'B_002','2023-12-04'),(1480,'B_002','2023-12-04'),(1481,'B_002','2023-12-04'),(1482,'B_002','2023-12-04'),(1483,'B_002','2023-12-04'),(1484,'B_002','2023-12-04'),(1485,'B_002','2023-12-04'),(1486,'B_002','2023-12-04'),(1487,'B_002','2023-12-04'),(1488,'B_002','2023-12-04'),(1489,'B_002','2023-12-04'),(1490,'B_002','2023-12-04'),(1491,'B_002','2023-12-04'),(1492,'B_002','2023-12-04'),(1493,'B_002','2023-12-04'),(1494,'B_002','2023-12-04'),(1495,'B_002','2023-12-04'),(1496,'B_002','2023-12-04'),(1497,'B_002','2023-12-04'),(1498,'B_002','2023-12-04'),(1499,'B_002','2023-12-04'),(1500,'B_002','2023-12-04'),(1501,'B_002','2023-12-04'),(1502,'B_002','2023-12-04'),(1503,'B_002','2023-12-04'),(1504,'B_002','2023-12-04'),(1505,'B_002','2023-12-04'),(1506,'B_002','2023-12-04'),(1507,'B_002','2023-12-04'),(1508,'B_002','2023-12-04'),(1509,'B_002','2023-12-04'),(1510,'B_002','2023-12-04'),(1511,'B_002','2023-12-04'),(1512,'B_002','2023-12-04'),(1513,'B_002','2023-12-04'),(1514,'B_002','2023-12-04'),(1515,'B_002','2023-12-04'),(1516,'B_002','2023-12-04'),(1517,'B_002','2023-12-04'),(1518,'B_002','2023-12-04'),(1519,'B_002','2023-12-04'),(1520,'B_002','2023-12-04'),(1521,'B_002','2023-12-04'),(1522,'B_002','2023-12-04'),(1523,'B_002','2023-12-04'),(1524,'B_002','2023-12-04'),(1525,'B_002','2023-12-04'),(1526,'B_002','2023-12-04'),(1527,'B_002','2023-12-04'),(1528,'B_002','2023-12-04'),(1529,'B_002','2023-12-04'),(1530,'B_002','2023-12-04'),(1531,'B_002','2023-12-04'),(1532,'B_002','2023-12-04'),(1533,'B_002','2023-12-04'),(1534,'B_002','2023-12-04'),(1535,'B_002','2023-12-04'),(1536,'B_002','2023-12-04'),(1537,'B_002','2023-12-04'),(1538,'B_002','2023-12-04'),(1539,'B_002','2023-12-04'),(1540,'B_002','2023-12-04'),(1541,'B_002','2023-12-04'),(1542,'B_002','2023-12-04'),(1543,'B_002','2023-12-04'),(1544,'B_002','2023-12-04'),(1545,'B_002','2023-12-04'),(1546,'B_002','2023-12-04'),(1547,'B_002','2023-12-04'),(1548,'B_002','2023-12-04'),(1549,'B_002','2023-12-04'),(1550,'B_002','2023-12-04'),(1551,'B_002','2023-12-04'),(1552,'B_002','2023-12-04'),(1553,'B_002','2023-12-04'),(1554,'B_002','2023-12-04'),(1555,'B_002','2023-12-04'),(1556,'B_002','2023-12-04'),(1557,'B_002','2023-12-04'),(1558,'B_002','2023-12-04'),(1559,'B_002','2023-12-04'),(1560,'B_002','2023-12-04'),(1561,'B_002','2023-12-04'),(1562,'B_002','2023-12-04'),(1563,'B_002','2023-12-04'),(1564,'B_002','2023-12-04'),(1565,'B_002','2023-12-04'),(1566,'B_002','2023-12-04'),(1567,'B_002','2023-12-04'),(1568,'B_002','2023-12-04'),(1569,'B_002','2023-12-04'),(1570,'B_002','2023-12-04'),(1571,'B_002','2023-12-04'),(1572,'B_002','2023-12-04'),(1573,'B_002','2023-12-04'),(1574,'B_002','2023-12-04'),(1575,'B_002','2023-12-04'),(1576,'B_002','2023-12-04'),(1577,'B_002','2023-12-04'),(1578,'B_002','2023-12-04'),(1579,'B_002','2023-12-04'),(1580,'B_002','2023-12-04'),(1581,'B_002','2023-12-04'),(1582,'B_002','2023-12-04'),(1583,'B_002','2023-12-04'),(1584,'B_002','2023-12-04'),(1585,'B_002','2023-12-04'),(1586,'B_002','2023-12-04'),(1587,'B_002','2023-12-04'),(1588,'B_002','2023-12-04'),(1589,'B_002','2023-12-04'),(1590,'B_002','2023-12-04'),(1591,'B_002','2023-12-04'),(1592,'B_002','2023-12-04'),(1593,'B_002','2023-12-04'),(1594,'B_002','2023-12-04'),(1595,'B_002','2023-12-04'),(1596,'B_002','2023-12-04'),(1597,'B_002','2023-12-04'),(1598,'B_002','2023-12-04'),(1599,'B_002','2023-12-04'),(1600,'B_002','2023-12-04'),(1601,'B_002','2023-12-04'),(1602,'B_002','2023-12-04'),(1603,'B_002','2023-12-04'),(1604,'B_002','2023-12-04'),(1605,'B_002','2023-12-04'),(1606,'B_002','2023-12-04'),(1607,'B_002','2023-12-04'),(1608,'B_002','2023-12-04'),(1609,'B_002','2023-12-04'),(1610,'B_002','2023-12-04'),(1611,'B_002','2023-12-04'),(1612,'B_002','2023-12-04'),(1613,'B_002','2023-12-04'),(1614,'B_002','2023-12-04'),(1615,'B_002','2023-12-04'),(1616,'B_002','2023-12-04'),(1617,'B_002','2023-12-04'),(1618,'B_002','2023-12-04'),(1619,'B_002','2023-12-04'),(1620,'B_002','2023-12-04'),(1621,'B_002','2023-12-04'),(1622,'B_002','2023-12-04'),(1623,'B_002','2023-12-04'),(1624,'B_002','2023-12-04'),(1625,'B_002','2023-12-04'),(1626,'B_002','2023-12-04'),(1627,'B_002','2023-12-04'),(1628,'B_002','2023-12-04'),(1629,'B_002','2023-12-04'),(1630,'B_002','2023-12-04'),(1631,'B_002','2023-12-04'),(1632,'B_002','2023-12-04'),(1633,'B_002','2023-12-04'),(1634,'B_002','2023-12-04'),(1635,'B_002','2023-12-04'),(1636,'B_002','2023-12-04'),(1637,'B_002','2023-12-04'),(1638,'B_002','2023-12-04'),(1639,'B_002','2023-12-04'),(1640,'B_002','2023-12-04'),(1641,'B_002','2023-12-04'),(1642,'B_002','2023-12-04'),(1643,'B_002','2023-12-04'),(1644,'B_002','2023-12-04'),(1645,'B_002','2023-12-04'),(1646,'B_002','2023-12-04'),(1647,'B_002','2023-12-04'),(1648,'B_002','2023-12-04'),(1649,'B_002','2023-12-04'),(1650,'B_002','2023-12-04'),(1651,'B_002','2023-12-04'),(1652,'B_002','2023-12-04'),(1653,'B_002','2023-12-04'),(1654,'B_002','2023-12-04'),(1655,'B_002','2023-12-04'),(1656,'B_002','2023-12-04'),(1657,'B_002','2023-12-04'),(1658,'B_002','2023-12-04'),(1659,'B_002','2023-12-04'),(1660,'B_002','2023-12-04'),(1661,'B_002','2023-12-04'),(1662,'B_002','2023-12-04'),(1663,'B_002','2023-12-04'),(1664,'B_002','2023-12-04'),(1665,'B_002','2023-12-04'),(1666,'B_002','2023-12-04'),(1667,'B_002','2023-12-04'),(1668,'B_002','2023-12-04'),(1669,'B_002','2023-12-04'),(1670,'B_002','2023-12-04'),(1671,'B_002','2023-12-04'),(1672,'B_002','2023-12-04'),(1673,'B_002','2023-12-04'),(1674,'B_002','2023-12-04'),(1675,'B_002','2023-12-04'),(1676,'B_002','2023-12-04'),(1677,'B_002','2023-12-04'),(1678,'B_002','2023-12-04'),(1679,'B_002','2023-12-04'),(1680,'B_002','2023-12-04'),(1681,'B_002','2023-12-04'),(1682,'B_002','2023-12-04'),(1683,'B_002','2023-12-04'),(1684,'B_002','2023-12-04'),(1685,'B_002','2023-12-04'),(1686,'B_002','2023-12-04'),(1687,'B_002','2023-12-04'),(1688,'B_002','2023-12-04'),(1689,'B_002','2023-12-04'),(1690,'B_002','2023-12-04'),(1691,'B_002','2023-12-04'),(1692,'B_002','2023-12-04'),(1693,'B_002','2023-12-04'),(1694,'B_002','2023-12-04'),(1695,'B_002','2023-12-04'),(1696,'B_002','2023-12-04'),(1697,'B_002','2023-12-04'),(1698,'B_002','2023-12-04'),(1699,'B_002','2023-12-04'),(1700,'B_002','2023-12-04'),(1701,'B_002','2023-12-04'),(1702,'B_002','2023-12-04'),(1703,'B_002','2023-12-04'),(1704,'B_002','2023-12-04'),(1705,'B_002','2023-12-04'),(1706,'B_002','2023-12-04'),(1707,'B_002','2023-12-04'),(1708,'B_002','2023-12-04'),(1709,'B_002','2023-12-04'),(1710,'B_002','2023-12-04'),(1711,'B_002','2023-12-04'),(1712,'B_002','2023-12-04'),(1713,'B_002','2023-12-04'),(1714,'B_002','2023-12-04'),(1715,'B_002','2023-12-04'),(1716,'B_002','2023-12-04'),(1717,'B_002','2023-12-04'),(1718,'B_002','2023-12-04'),(1719,'B_002','2023-12-04'),(1720,'B_002','2023-12-04'),(1721,'B_002','2023-12-04'),(1722,'B_030','2023-12-04'),(1729,'B_028','2023-12-04'),(1733,'B_002','2023-12-04'),(1734,'B_002','2023-12-04'),(1741,'B_028','2023-12-04'),(1747,'B_030','2023-12-04'),(1755,'B_029','2023-12-04'),(1758,'B_029','2023-12-04'),(1765,'B_028','2023-12-04'),(1769,'B_002','2023-12-04'),(1772,'B_003','2023-12-04'),(1778,'B_027','2023-12-04'),(1782,'B_027','2023-12-04'),(1788,'B_027','2023-12-04'),(1796,'B_027','2023-12-04'),(1801,'B_030','2023-12-04'),(1806,'B_027','2023-12-04'),(1811,'B_002','2023-12-04'),(1819,'B_030','2023-12-04'),(1824,'B_002','2023-12-04'),(1825,'B_003','2023-12-04'),(1830,'B_027','2023-12-04'),(1836,'B_027','2023-12-04'),(1843,'B_030','2023-12-04'),(1849,'B_030','2023-12-04'),(1854,'B_027','2023-12-04'),(1860,'B_027','2023-12-04'),(1862,'B_001','2023-12-04'),(1871,'B_008','2023-12-04'),(1877,'B_008','2023-12-04'),(1878,'B_027','2023-12-04'),(1884,'B_027','2023-12-04'),(1891,'B_030','2023-12-04'),(1898,'B_003','2023-12-04'),(1902,'B_027','2023-12-04'),(1909,'B_028','2023-12-04'),(1915,'B_030','2023-12-04'),(1921,'B_030','2023-12-04'),(1926,'B_027','2023-12-04'),(1931,'B_002','2023-12-04'),(1933,'B_028','2023-12-04'),(1938,'B_002','2023-12-04'),(1944,'B_002','2023-12-04'),(1950,'B_027','2023-12-04'),(1955,'B_002','2023-12-04'),(1961,'B_002','2023-12-04'),(1967,'B_008','2023-12-04'),(1971,'B_003','2023-12-04'),(1975,'B_028','2023-12-04'),(1981,'B_027','2023-12-04'),(1986,'B_002','2023-12-04'),(1992,'B_002','2023-12-04'),(1998,'B_028','2023-12-04'),(2003,'B_002','2023-12-04'),(2009,'B_002','2023-12-04'),(2015,'B_008','2023-12-04'),(2021,'B_008','2023-12-04'),(2022,'B_027','2023-12-04'),(2029,'B_027','2023-12-04'),(2031,'B_001','2023-12-04'),(2036,'B_008','2023-12-04'),(2043,'B_003','2023-12-04'),(2046,'B_027','2023-12-04'),(2053,'B_028','2023-12-04'),(2058,'B_002','2023-12-04'),(2065,'B_027','2023-12-04'),(2070,'B_029','2023-12-04'),(2075,'B_002','2023-12-04'),(2077,'B_029','2023-12-04'),(2087,'B_008','2023-12-04'),(2093,'B_008','2023-12-04'),(2094,'B_028','2023-12-04'),(2101,'B_029','2023-12-04'),(2106,'B_002','2023-12-04'),(2109,'B_003','2023-12-04'),(2113,'B_030','2023-12-04'),(2118,'B_028','2023-12-04'),(2121,'B_027','2023-12-04'),(2128,'B_001','2023-12-04'),(2132,'B_003','2023-12-04'),(2139,'B_028','2023-12-04'),(2142,'B_027','2023-12-04'),(2143,'B_028','2023-12-04'),(2150,'B_029','2023-12-04'),(2157,'B_003','2023-12-04'),(2162,'B_027','2023-12-04'),(2166,'B_028','2023-12-04'),(2176,'B_001','2023-12-04'),(2183,'B_008','2023-12-04'),(2189,'B_008','2023-12-04'),(2190,'B_002','2023-12-04'),(2197,'B_028','2023-12-04'),(2202,'B_003','2023-12-04'),(2208,'B_027','2023-12-04'),(2214,'B_002','2023-12-04'),(2219,'B_008','2023-12-04'),(2226,'B_002','2023-12-04'),(2233,'B_028','2023-12-04'),(2240,'B_002','2023-12-04'),(2245,'B_027','2023-12-04'),(2250,'B_030','2023-12-04'),(2256,'B_027','2023-12-04'),(2262,'B_027','2023-12-04'),(2267,'B_002','2023-12-04'),(2272,'B_001','2023-12-04'),(2274,'B_002','2023-12-04'),(2280,'B_002','2023-12-04'),(2286,'B_028','2023-12-04'),(2293,'B_028','2023-12-04'),(2298,'B_002','2023-12-04'),(2304,'B_002','2023-12-04'),(2310,'B_027','2023-12-04'),(2315,'B_027','2023-12-04'),(2321,'B_002','2023-12-04'),(2327,'B_008','2023-12-04'),(2328,'B_002','2023-12-04'),(2333,'B_008','2023-12-04'),(2334,'B_027','2023-12-04'),(2340,'B_027','2023-12-04'),(2346,'B_002','2023-12-04'),(2349,'B_003','2023-12-04'),(2353,'B_030','2023-12-04'),(2358,'B_027','2023-12-04'),(2359,'B_002','2023-12-04'),(2363,'B_028','2023-12-04'),(2364,'B_008','2023-12-04'),(2365,'B_027','2023-12-04'),(2369,'B_001','2023-12-04'),(2370,'B_002','2023-12-04'),(2371,'B_002','2023-12-04'),(2378,'B_028','2023-12-04'),(2383,'B_002','2023-12-04'),(2389,'B_027','2023-12-04'),(2397,'B_027','2023-12-04'),(2401,'B_027','2023-12-04'),(2407,'B_027','2023-12-04'),(2416,'B_030','2023-12-04'),(2423,'B_028','2023-12-04'),(2425,'B_008','2023-12-04'),(2429,'B_028','2023-12-04'),(2434,'B_030','2023-12-04'),(2437,'B_027','2023-12-04'),(2438,'B_028','2023-12-04'),(2441,'B_002','2023-12-04'),(2443,'B_002','2023-12-04'),(2444,'B_030','2023-12-04'),(2445,'B_027','2023-12-04'),(2449,'B_008','2023-12-04'),(2454,'B_008','2023-12-04'),(2456,'B_029','2023-12-04'),(2461,'B_027','2023-12-04'),(2467,'B_002','2023-12-04'),(2472,'B_008','2023-12-04'),(2477,'B_028','2023-12-04'),(2479,'B_002','2023-12-04'),(2485,'B_027','2023-12-04'),(2491,'B_002','2023-12-04'),(2497,'B_027','2023-12-04'),(2502,'B_002','2023-12-04'),(2503,'B_002','2023-12-04'),(2510,'B_028','2023-12-04'),(2515,'B_030','2023-12-04'),(2516,'B_002','2023-12-04'),(2522,'B_028','2023-12-04'),(2526,'B_002','2023-12-04'),(2527,'B_027','2023-12-04'),(2532,'B_002','2023-12-04'),(2539,'B_002','2023-12-04'),(2543,'B_028','2023-12-04'),(2544,'B_008','2023-12-04'),(2550,'B_008','2023-12-04'),(2551,'B_028','2023-12-04'),(2561,'B_001','2023-12-04'),(2566,'B_003','2023-12-04'),(2570,'B_027','2023-12-04'),(2573,'B_028','2023-12-04'),(2574,'B_008','2023-12-04'),(2575,'B_027','2023-12-04'),(2580,'B_002','2023-12-04'),(2584,'B_030','2023-12-04'),(2586,'B_002','2023-12-04'),(2589,'B_030','2023-12-04'),(2595,'B_027','2023-12-04'),(2599,'B_027','2023-12-04'),(2604,'B_002','2023-12-04'),(2606,'B_028','2023-12-04'),(2612,'B_030','2023-12-04'),(2618,'B_030','2023-12-04'),(2621,'B_008','2023-12-04'),(2623,'B_027','2023-12-04'),(2628,'B_002','2023-12-04'),(2631,'B_027','2023-12-04'),(2635,'B_002','2023-12-04'),(2640,'B_008','2023-12-04'),(2641,'B_002','2023-12-04'),(2647,'B_027','2023-12-04'),(2649,'B_030','2023-12-04'),(2655,'B_029','2023-12-04'),(2660,'B_030','2023-12-04'),(2664,'B_008','2023-12-04'),(2670,'B_008','2023-12-04'),(2671,'B_027','2023-12-04'),(2678,'B_028','2023-12-04'),(2680,'B_029','2023-12-04'),(2685,'B_003','2023-12-04'),(2688,'B_002','2023-12-04'),(2695,'B_027','2023-12-04'),(2696,'B_028','2023-12-04'),(2697,'B_001','2023-12-04'),(2706,'B_002','2023-12-04'),(2709,'B_027','2023-12-04'),(2716,'B_027','2023-12-04'),(2719,'B_027','2023-12-04'),(2722,'B_030','2023-12-04'),(2728,'B_030','2023-12-04'),(2734,'B_003','2023-12-04'),(2740,'B_003','2023-12-04'),(2743,'B_027','2023-12-04'),(2750,'B_027','2023-12-04'),(2754,'B_002','2023-12-04'),(2755,'B_002','2023-12-04'),(2763,'B_027','2023-12-04'),(2767,'B_027','2023-12-04'),(2773,'B_027','2023-12-04'),(2780,'B_030','2023-12-04'),(2786,'B_030','2023-12-04'),(2790,'B_008','2023-12-04'),(2792,'B_027','2023-12-04'),(2796,'B_002','2023-12-04'),(2802,'B_002','2023-12-04'),(2808,'B_008','2023-12-04'),(2814,'B_008','2023-12-04'),(2816,'B_030','2023-12-04'),(2821,'B_027','2023-12-04'),(2827,'B_002','2023-12-04'),(2832,'B_008','2023-12-04'),(2838,'B_008','2023-12-04'),(2840,'B_029','2023-12-04'),(2846,'B_029','2023-12-04'),(2851,'B_002','2023-12-04'),(2857,'B_002','2023-12-04'),(2862,'B_008','2023-12-04'),(2863,'B_027','2023-12-04'),(2866,'B_001','2023-12-04'),(2872,'B_030','2023-12-04'),(2878,'B_003','2023-12-04'),(2883,'B_027','2023-12-04'),(2886,'B_008','2023-12-04'),(2888,'B_030','2023-12-04'),(2893,'B_002','2023-12-04'),(2899,'B_027','2023-12-04'),(2902,'B_001','2023-12-04'),(2909,'B_030','2023-12-04'),(2914,'B_003','2023-12-04'),(2920,'B_003','2023-12-04'),(2922,'B_028','2023-12-04'),(2923,'B_002','2023-12-04'),(2929,'B_002','2023-12-04'),(2935,'B_027','2023-12-04'),(2941,'B_027','2023-12-04'),(2948,'B_030','2023-12-04'),(2953,'B_002','2023-12-04'),(2956,'B_008','2023-12-04'),(2959,'B_002','2023-12-04'),(2965,'B_002','2023-12-04'),(2972,'B_029','2023-12-04'),(2975,'B_030','2023-12-04'),(2980,'B_001','2023-12-04'),(2984,'B_030','2023-12-04'),(2989,'B_002','2023-12-04'),(2995,'B_002','2023-12-04'),(3000,'B_008','2023-12-04'),(3006,'B_008','2023-12-04'),(3007,'B_028','2023-12-04'),(3013,'B_028','2023-12-04'),(3020,'B_030','2023-12-04'),(3027,'B_002','2023-12-04'),(3031,'B_002','2023-12-04'),(3037,'B_030','2023-12-04'),(3043,'B_027','2023-12-04'),(3049,'B_027','2023-12-04'),(3055,'B_002','2023-12-04'),(3061,'B_002','2023-12-04'),(3067,'B_002','2023-12-04'),(3073,'B_002','2023-12-04'),(3078,'B_008','2023-12-04'),(3079,'B_027','2023-12-04'),(3086,'B_027','2023-12-04'),(3090,'B_002','2023-12-04'),(3092,'B_028','2023-12-04'),(3098,'B_030','2023-12-04'),(3103,'B_001','2023-12-04'),(3104,'B_001','2023-12-04'),(3105,'B_001','2023-12-04'),(3106,'B_001','2023-12-04'),(3107,'B_001','2023-12-04'),(3108,'B_030','2023-12-04'),(3109,'B_030','2023-12-04'),(3110,'B_030','2023-12-04'),(3111,'B_030','2023-12-04'),(3112,'B_003','2023-12-04'),(3113,'B_028','2023-12-04'),(3114,'B_001','2023-12-04'),(3115,'B_001','2023-12-04'),(3116,'B_001','2023-12-04'),(3117,'B_001','2023-12-04'),(3118,'B_001','2023-12-04'),(3119,'B_001','2023-12-04'),(3120,'B_006','2023-12-04'),(3121,'B_004','2023-12-04'),(3122,'B_004','2023-12-04'),(3123,'B_006','2023-12-04'),(3124,'B_001','2023-12-04'),(3125,'B_001','2023-12-04'),(3126,'B_030','2023-12-04'),(3127,'B_030','2023-12-04'),(3128,'B_030','2023-12-04'),(3129,'B_001','2023-12-04'),(3130,'B_030','2023-12-04'),(3131,'B_030','2023-12-04'),(3132,'B_030','2023-12-04'),(3133,'B_030','2023-12-04'),(3134,'B_030','2023-12-04'),(3135,'B_030','2023-12-04'),(3136,'B_030','2023-12-04'),(3137,'B_030','2023-12-04'),(3138,'B_001','2023-12-04'),(3139,'B_030','2023-12-04'),(3140,'B_030','2023-12-04'),(3141,'B_030','2023-12-04'),(3142,'B_030','2023-12-04'),(3143,'B_030','2023-12-04'),(3144,'B_028','2023-12-04'),(3145,'B_001','2023-12-04'),(3146,'B_027','2023-12-04'),(3147,'B_022','2023-12-04'),(3148,'B_015','2023-12-04'),(3149,'B_030','2023-12-04'),(3150,'B_001','2023-12-04'),(3151,'B_003','2023-12-04'),(3152,'B_030','2023-12-05');
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
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'CH_001','sgdyshdgsydgudgwygwugw.jpg',1),(2,'CH_001','dnsjdhuehdwuhguwhehdeweiw.jpg',2),(3,'CH_001','wdbhwgwudbjwgdugduwehquqi.jpg',3),(4,'CH_001','qetywuiehweqijdsfgdija.jpg',4),(5,'CH_001','weyiwgrewuijedkhfdgfhheuhdnshfg.jpg',5),(6,'CH_001','yuewhwigruekjsdbhgdxcbvchdjgfbsg.jpg',6),(7,'CH_001','ddtwygewygeuwiejdhfbdbfesdwi.jpg',7),(8,'CH_001','qewwhjireuruidjskgfbdjfbisdk.jpg',8),(9,'CH_001','fdfnweurhiwukhfeyfhbejfhj.jpg',9),(10,'CH_001','sdiuwfbcmndksneqiuw.jpg',10),(11,'CH_001','sgdhsdeusidjsjfudhdgx.jpg',11),(12,'CH_001','aehqiweiwureygfbvcnvbdh.jpg',12),(13,'CH_002','poiuytfgwshjnwndbscvgxh.jpg',1),(14,'CH_002','bvujdnfwdsdgwhdksjbf.jpg',2),(15,'CH_002','eyrujetgfdbfdjhnsfvedn.jpg',3),(16,'CH_002','yreiotrtruhdfb xvfwhjshna.jpg',4),(17,'CH_002','tyryteifjnvjdnvudhf.jpg',5),(18,'CH_002','qwhteyuiotkrmg vcnxvcbxj.jpg',6),(19,'CH_002','wetyuirotgkfvdgxcvb.jpg',7),(20,'CH_003','sdsmdnwydhwhsadvusydbesjh.jpg',1),(21,'CH_003','wswgduysjbdwtysghwjsvb.jpg',2),(22,'CH_003','weqyeujswkjdheshdnsdgwjsdvwjsh.jpg',3),(23,'CH_003','qrtywuekrddsuyjdnefvejsukdjs.jpg',4),(24,'CH_003','wdwayhsjknndfgwukdjejsfgdn.jpg',5),(25,'CH_003','dsdwsdwdkwuejwiekdwdjhnwka.jpg',6),(26,'CH_003','qwdsdujwjsdkiwajewdhsuk.jpg',7),(27,'CH_004','sdfghjkamnsdwdgwjasndd.jpg',1),(28,'CH_004','gwhgdwuhsahdnsjsn.jpg',2),(29,'CH_004','ouywudbjscjxhbnsjn.jpg',3),(30,'CH_004','ghsdhjzbwtyaswjildkx.jpg',4),(31,'CH_004','wuiwksdnsjzdhnsbck.jpg',5),(32,'CH_004','oiutyrywtuiokdjsnbvu.jpg',6),(33,'CH_004','tyuijwhtyasujsdsjhxn.jpg',7),(34,'CH_005','deudyiwjndbhsyuhdjne.jpg',1),(35,'CH_005','tyuknbvhywuijdnshjn.jpg',2),(36,'CH_005','qeywuirjerhfdfhbdfbd.jpg',3),(37,'CH_005','poiuytedjkmndfdsm.jpg',4),(38,'CH_005','poiuyttyghjkmnvcftyuj.jpg',5),(39,'CH_005','poiuwytghusjdnsjbsjhdsjdn.jpg',6),(40,'CH_005','picdywwtwjdnwdgyu.jpg',7),(41,'CH_006','bbjdfsdhsdihdendja.jpg',1),(42,'CH_006','kqjiqhiqjsvdysudsdk.jpg',2),(43,'CH_006','pwoeuwyjdsvshdaksak.jpg',3),(44,'CH_006','nvdjncjsdiwowjwoj.jpg',4),(45,'CH_006','vbasbushiwhd.jpg',5),(46,'CH_006','mcijmaksoqsqdnk.jpg',6),(47,'CH_006','bchsdyuhjqajsjykuudjshdghj.jpg',7),(48,'CH_007','wtyuieorrueilrhewiuriwjrei.jpg',1),(49,'CH_007','ghdwdhjwmdvjsfhnjehdn.jpg',2),(50,'CH_007','iouwlekmwnjdghjsnmcb.jpg',3),(51,'CH_007','oiuywtyuiekdjjfhsgh.jpg',4),(52,'CH_007','wuwygeuwjdkhejdb.jpg',5),(53,'CH_007','vbjshvdjwhdwjkwiks.jpg',6),(54,'CH_007','poiuytghdnsbdvshdwjks.jpg',7),(55,'CH_008','ryeuiwokwjdshfnjhdnedsk.jpg',1),(56,'CH_008','mhdgsudhwudhiw.jpg',2),(57,'CH_008','kjhghshdwuduwkj.jpg',3),(58,'CH_008','ncdncuhdiwdjwhdwuh.jpg',4),(59,'CH_008','kjsihdwidjwpdwdeudjwu.jpg',5),(60,'CH_008','ndjbdwhdwguqwhw.jpg',6),(61,'CH_008','ihywhewygdhddvbmdjn.jpg',7),(62,'CH_009','dejdhenbjduwikjewjdghen.jpg',1),(63,'CH_009','jwkjsuhsjsghndgwukj.jpg',2),(64,'CH_009','jwwuwisjdsbdsgb.jpg',3),(65,'CH_009','ediejdhncdcbsjdnjsdcnx.jpg',4),(66,'CH_009','cfswygsuwidhwydh.jpg',5),(67,'CH_009','pouwytywhdnsvdbs.jpg',6),(68,'CH_009','xgbdywhdkwjwkjhd.jpg',7),(69,'CH_010','dnjedbeukjdnefbc.jpg',1),(70,'CH_010','cbhduwkjnqwjs.jpg',2),(71,'CH_010','zxfgavshwhdwksj.jpg',3),(72,'CH_010','xvgsvhsiqjswhdwu.jpg',4),(73,'CH_010','mcvhsjdwhgsua.jpg',5),(74,'CH_010','mchdghwjgwusaj.jpg',6),(75,'CH_010','tyirfbhefdgeujrenfrb.jpg',7),(76,'CH_011','jdhsjdgeukhdnjedbej.jpg',1),(77,'CH_011','ncvshdwydhwkhws.jpg',2),(78,'CH_011','ncdhgjwhgdiuwkejendhb.jpg',3),(79,'CH_011','iwwdgyudhehfvdchxb.jpg',4),(80,'CH_011','cgvhsvgshdgwbdsxb.jpg',5),(81,'CH_011','cndgwkhdwuyhs.jpg',6),(82,'CH_011','rtywyuhwdgshd.jpg',7),(83,'CH_012','cbdbcjskdnjdbnisk.jpg',1),(84,'CH_012','qwertyuhbghbn.jpg',2),(85,'CH_012','myuhiqwjksnwjksn.jpg',3),(86,'CH_012','trthsbvxbshcndkwjd.jpg',4),(87,'CH_012','oyuwjdhdsjnsdsjn.jpg',5),(88,'CH_012','argqsuywghukjqnjfbrdjfn.jpg',6),(89,'CH_012','987udijhbcdyhdsbsjh.jpg',7),(90,'CH_013','sdhjdnejdhsnkjdm.jpg',1),(91,'CH_013','luyijakjsgwhukdhuyd.jpg',2),(92,'CH_013','3456782uhewy6ywushj.jpg',3),(93,'CH_013','8765rytghjsbhfdghjs.jpg',4),(94,'CH_013','987uhshggwhjndsdhj.jpg',5),(95,'CH_013','45tyghbvy6utwyuh.jpg',6),(96,'CH_013','7667uhbsghgh.jpg',7),(97,'CH_014','djncehjsdnwskhdjwdsuj.jpg',1),(98,'CH_014','072uwhdbshdbshb.jpg',2),(99,'CH_014','176277ehdsdbjhbcsx.jpg',3),(100,'CH_014','98765425678u3ejdsdsghbn.jpg',4),(101,'CH_014','6hgdsd78uwewu.jpg',5),(102,'CH_014','3647854redytfgdbfegjhs.jpg',6),(103,'CH_014','orr47ru83ieuhdyhs.jpg',7),(104,'CH_015','hdjhsndjsdnsdhbnhn.jpg',1),(105,'CH_015','92883746yreujdbfejhdsn.jpg',2),(106,'CH_015','56787ushuwgshvdbsh.jpg',3),(107,'CH_015','28743yrhiufdfgh387.jpg',4),(108,'CH_015','bhdbcjhdnwknsdn.jpg',5),(109,'CH_015','ueiowekwdbkjsnc.jpg',6),(110,'CH_015','hdjsndiwuijwjw8.jpg',7),(111,'CH_016','smsjhsjnjsabjk.jpg',1),(112,'CH_016','iuywtyusjedsbnjnx.jpg',2),(113,'CH_016','287wtyhssddgyshjn.jpg',3),(114,'CH_016','gcydhwd78u2oueidhs.jpg',4),(115,'CH_016','dgdvbsdbws82728.jpg',5),(116,'CH_016','cvbnsgdwytyswdgw8.jpg',6),(117,'CH_016','vbrufgh3874283urhd.jpg',7),(118,'CH_017','wgjdhnedgehujsdwius.jpg',1),(119,'CH_017','82787uewhdedn.jpg',2),(120,'CH_017','cbdhwyduqwdugsuh.jpg',3),(121,'CH_017','e7h3yegdheygh3iuh.jpg',4),(122,'CH_017','6e74eyurhfrdfy3uehjds.jpg',5),(123,'CH_017','bhcbdwudjwoidjnsj.jpg',6),(124,'CH_017','67438eruhfrsdfghwsdj.jpg',7),(125,'CH_018','cdsjbwyushjnahbsjdknsx.jpg',1),(126,'CH_018','gehdksyudhnwujdnwui8.jpg',2),(127,'CH_018','iurhegejhfbsjbu7yu.jpg',3),(128,'CH_018','eg37te783ue2iheidu.jpg',4),(129,'CH_018','84974et6yiudjheyfdhsjdgyhj.jpg',5),(130,'CH_018','390874e56ytgdhsbvdgh.jpg',6),(131,'CH_018','9876twydhsdghsedhn.jpg',7),(132,'CH_019','siuweu3iu38edij.jpg',1),(133,'CH_019','467eryduhnjfyeujdksm.jpg',2),(134,'CH_019','39876ey3uidsgdbuhjsdbnwha.jpg',3),(135,'CH_019','478tr7euihbfrhdjmsjd.jpg',4),(136,'CH_019','cbhsjkdhwyuw8ui.jpg',5),(137,'CH_019','8374iurjehbdhgbsdgwyshj.jpg',6),(138,'CH_019','hdujnesdg7838uei288367.jpg',7),(139,'CH_020','sbdnwkhwdhbesjdbj.jpg',1),(140,'CH_020','rfedgyjioseur4hy7548eih.jpg',2),(141,'CH_020','4634uejbdghsdhwasjm.jpg',3),(142,'CH_020','mnshashgw7wuoi2wjq.jpg',4),(143,'CH_020','ncbsuydgwusyqiuw28wu78.jpg',5),(144,'CH_020','78832uehwdshdn.jpg',6),(145,'CH_020','3436576teyhjdsdbyegsb.jpg',7);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package_premium`
--

LOCK TABLES `package_premium` WRITE;
/*!40000 ALTER TABLE `package_premium` DISABLE KEYS */;
INSERT INTO `package_premium` VALUES (1,200000,30),(2,550000,90),(3,1000000,180),(4,1500000,365);
/*!40000 ALTER TABLE `package_premium` ENABLE KEYS */;
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
INSERT INTO `ratings` VALUES ('US_001','B_001',5,'Truyện chạm đến cảm xúc'),('US_001','B_030',4,'Truyen rat hay'),('US_002','B_030',5,'tuyet voi'),('US_003','B_001',5,'Truyện rất hay và kịch tính'),('US_003','B_005',4,'Quá cảm xúc');
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
  PRIMARY KEY (`id`),
  KEY `fk_wallet_transactions` (`wallet_id`),
  CONSTRAINT `fk_wallet_transactions` FOREIGN KEY (`wallet_id`) REFERENCES `wallets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_premium`
--

LOCK TABLES `user_premium` WRITE;
/*!40000 ALTER TABLE `user_premium` DISABLE KEYS */;
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
  `bank_account` varchar(20) DEFAULT NULL,
  `bank_name` varchar(20) DEFAULT NULL,
  `isLocked` tinyint(1) DEFAULT '0',
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
INSERT INTO `users` VALUES ('US_001','Lai Van Quy','6ebfc31fbb3b4ba8aa08b3d1050b2d6f.jpg','quylang012@gmail.com','0221234343','Quyne','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','1232343434','Vietcombank',0),('US_002','Le Dinh Bao','','hjihi012@gmail.com','0243434328','Baone','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','9876545343','Vietcombank',0),('US_003','Nguyen Van A','','20110708@student.hcmute.edu.vn','0243434328','Nguyen Van A','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','987689787','Vietcombank',0);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `fk_user_wallet` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallets`
--

LOCK TABLES `wallets` WRITE;
/*!40000 ALTER TABLE `wallets` DISABLE KEYS */;
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

-- Dump completed on 2023-12-05  0:47:39
