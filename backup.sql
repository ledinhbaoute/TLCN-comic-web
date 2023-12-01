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
INSERT INTO `comicbooks` VALUES ('B_001','Conan',0,'US_001','56230picture16309480627.jpg','Mở đầu câu truyện, cậu học sinh trung học 17 tuổi Shinichi Kudo bị biến thành cậu bé Conan Edogawa. Shinichi trong phần đầu của Thám tử lừng danh Conan được miêu tả là một thám tử học đường xuất sắc. Trong một lần đi chơi công viên Miền Nhiệt đới với cô bạn từ thuở nhỏ Ran Mori, cậu tình cờ chứng kiến vụ một án giết người, Kishida - một hành khách trong trò chơi Chuyến tàu tốc hành đã bị giết một cách dã man. Cậu đã giúp cảnh sát làm sáng tỏ vụ án. Trên đường về nhà, cậu vô tình phát hiện một vụ làm ăn mờ ám của những người đàn ông mặc toàn đồ đen. Khi chúng phát hiện ra cậu, Shinichi đã bị đánh ngất đi. Sau đó những người đàn ông áo đen đó đã cho cậu uống một thứ thuốc độc chưa qua thử nghiệm là Apotoxin-4869 với mục đích thủ tiêu cậu. Tuy nhiên chất độc đã không giết chết Kudo. Khi tỉnh lại, cậu bàng hoàng nhận thấy mình đã bị teo nhỏ lại thành hình dạng của một cậu học sinh tiểu học.',0,0.0,'2023-12-01','2023-12-01',1),('B_002','Dead Account',0,'US_002','deadaccount.jpg','Souji Enishiro, 15 tuổi (đã bỏ học), là một streamer gây tranh cãi, “Aoringo”(Táo Xanh) người kiếm được rất nhiều tiền nhờ nội dung video bạo lực thái quá của mình. Mặc dù được coi là một kẻ chuyên gây rối, nhưng trên thực tế, cậu ấy là một người anh tốt bụng, yêu em gái mình và đồ ngọt. Ngay cả những video gây tranh cãi của anh cũng chỉ là để trang trải chi phí y tế khổng lồ cho cô em gái ốm yếu. Cho dù mọi người trên thế giới có ghét cậu ấy, cậu ấy vẫn hạnh phúc miễn là cô em gái Akari có thể sống tốt. Đó là cho đến khi có chuyện gì đó xảy ra với em gái yêu quý của cậu ấy… Đây là sự khởi đầu của một loạt hành động trừ tà theo phong cách hiện đại mới!',0,0.0,'2023-12-01','2023-12-01',1),('B_003','One Piece',0,'US_002','asdvgvdgvfgsvdjqhebwyeg.jpg','Truyện One Piece: Monkey D. Luffy, 1 cậu bé rất thích hải tặc có ước mơ tìm được kho báu One Piece và trở thành Vua hải tặc - Pirate King. Lúc nhỏ, Luffy tình cờ ăn phải trái quỉ (Devil Fruit) Gomu Gomu, nó cho cơ thể cậu khả năng co dãn đàn hồi như cao su nhưng đổi lại cậu sẽ không bao giờ biết bơi. Sau đó Luffy lại được...',128,4.9,'2023-12-01','2023-12-01',1),('B_004','Brave Bell',0,'US_001','yruewjdhfjrydhfndfheidjfn.jpg','Sanada Souji, học sinh cuối cấp trung học, thông minh và khoẻ mạnh. Anh ấy cũng có bản chất tốt bụng và không ngần ngại giúp đỡ những người gặp khó khăn. Tuy nhiên, gia đình anh là yakuza. Vì điều này mà anh bị những người xung quanh ghét bỏ. Liệu sự cô đơn này có kéo dài mãi mãi? Trong khi sự lo lắng chiếm lấy tâm trí anh, anh nhận được một cuộc điện thoại và mọi thứ bắt đầu diễn ra theo chiều hướng bất ngờ. Đây là câu chuyện anh hùng của một chàng trai trẻ muốn trở thành anh hùng và phải đối mặt với một tổ chức khổng lồ bí ẩn.',18,4.0,'2023-12-01','2023-12-01',1),('B_005','Người Đàn Ông Mít Ướt',0,'US_001','yrfugdhbvfgherukjsdnamew.jpg','Một câu chuyện nặng nề về tâm lý, về những tên tâm thần. Nhân vật chính là một người đàn ông mít ướt nhút nhát đã có gia đình, nợ nần chồng chất vì cờ bạc. Anh không có cách nào lật ngược tình thế cho đến khi ông chủ của một công ty cho vay mờ ám giao cho anh công việc đòi nợ vì thân hình to lớn bất thường của anh. Đòi nợ không phải là công việc duy nhất. Thỉnh thoảng, anh ta được giao những công việc lặt vặt mờ ám khác, chẳng hạn như làm tài xế cho gái mại dâm và vận chuyển những thứ mờ ám (xác).',190,4.0,'2023-12-01','2023-12-01',1),('B_006','Spin-Off Học Viện Kimetsu!',0,'US_002','vchsjbrgfuwkjnsjfvefdkjfndsjbfdj.jpg','Ngoại truyện Học viện Kimetsu! Được thực hiện bởi tác giả Natsuki Hokami, phát triển cốt truyện từ các trang ngoại truyện nhỏ của tác phẩm gốc Kimetsu no Yaiba do tác giả Koyoharu Gotoge chắp bút. Các nhân vật trở thành học sinh và giáo viên vô cùng ưu tú và bất ổn, đem tới những câu chuyện về cuộc sống học đường yên bình và vui vẻ!',10,4.1,'2023-12-01','2023-12-01',1),('B_007','INITIAL D',0,'US_001','dfhbvfbgyufejhwenwihriefncdfvefe.jpg','Câu chuyện kể về một chiếc xe mang nhãn hiệu 86 huyền thoại có tốc độ di chuyển như sấm sét được mệnh danh là “Bóng ma của núi Akina” cùng với con đường chinh phục đỉnh cao của thế giới đua xe mạo hiểm của một cậu bé 18 tuổi Takumi Fujiwara. Được thừa hưởng dòng máu từ một tay đua siêu phàm, Takumi sớm đã bộc lộ năng lực và tố chất bẩm sinh khi chỉ mới 13 tuổi, dưới sự dìu dắt của cha mình cậu đã nhanh chóng hoàn thiện các kỹ năng bậc nhất trong nghệ thuật đua xe.',101,4.1,'2023-12-01','2023-12-01',1),('B_008','THẦN SỦNG TIẾN HÓA',0,'US_002','bjsndwuihdnwjbduhdndjsh.jpg','Thiên địa dị biến, yêu thú sinh sôi, kỷ nguyên mới của nhân loại đã cho ra đời 1 nghề nghiệp mới: thu phục quái vật, nuôi dưỡng quái vật, huấn luyện quái vật, đây chính là nghề Ngự Sử',55,4.6,'2023-12-01','2023-12-01',1),('B_009','Võ Luyện Đỉnh Phong',0,'US_002','dshdbsvhdfbhdguefbhefbsfbjsfbehgfjsb.jpg','Võ đạo đỉnh phong, là cô độc, là tịch mịch, là dài đằng đẵng cầu tác, là cao xử bất thắng hàn Phát triển trong nghịch cảnh, cầu sinh nơi tuyệt địa, bất khuất không buông tha, mới có thể có thể phá võ chi cực đạo.',15,4.0,'2023-12-01','2023-12-01',1),('B_010','The Kingdom of Ruin',0,'US_001','qtwyeuirtrkfgnvxcanfdjhf.jpg','Con người từ xưa đã sống dưới sự bảo hộ của phù thủy, họ tôn kính, biết ơn và đồng thời cũng cảm thấy ... KHIẾP SỢ trước năng lực của các phù thủy. Con người muốn nổi dậy, muốn chứng minh rằng thế giới hiện nay là do họ làm chủ ...',27,4.1,'2023-12-01','2023-12-01',1),('B_011','Sự Trỗi Dậy Của Anh Hùng Thất Nghiệp',0,'US_001','adbsjfeuhrwndfhsfhvdhgwiuejw.jpg','Karna là cậu bé được phong cho danh hiệu Bậc hiền nhân từ thiên đàng, cậu được thu nhận vào một đội anh hùng. Nhưng kĩ năng Gọi hồn của cậu lại quá kinh tởm nên cậu bị đá khỏi đội ngay lập tức và trở thành kẻ thất nghiệp',1187,4.1,'2023-12-01','2023-12-01',1),('B_012','Con Gái Của Mafia',0,'US_002','dbfhjbdsbfeygruwhiwfbhjdbvdjbfef.jpg','Câu chuyện kể về một chàng trai bình thường tên Mekh, cuộc đời sắp thay đổi vào thời điểm anh vô tình đụng phải cô gái khét tiếng và dễ bị hiểu lầm tên Saran.',8,4.9,'2023-12-01','2023-12-01',1),('B_013','Dr.slump',0,'US_001','wdnwjheuwhdjbdegfudfbrbdbsbvbdjf.jpg','Nhân vật chính của truyện là Arale, một cô bé robot giống hệt con người (tương tự nhân vật Pinocchio trong truyện thiếu nhi Ý). Tiến sĩ Slump tạo ra Arale nhằm khẳng định tài năng siêu việt của mình.',231,4.6,'2023-12-01','2023-12-01',1),('B_014','The Fable - The Second Contact',0,'US_002','adwfedhwhncvbxvdanskadjsdhws.jpg','Nối tiếp câu chuyện của Sát Thủ Ẩn Dật',425,4.7,'2023-12-01','2023-12-01',1),('B_015','Kagurabachi',0,'US_001','dwehwjfndhgwdwjrywgwbcjsdbwgeqhewgr.jpg','Cậu bé Chihiro dành cả ngày để luyện tập dưới sự hướng dẫn của người cha rèn kiếm nổi tiếng của mình. Một ngày nào đó anh hy vọng sẽ trở thành một thợ rèn kiếm vĩ đại',343,4.4,'2023-12-01','2023-12-01',1),('B_016','One-Punch Man',0,'US_002','MV5BZjJlNzE5YzEtYzQwYS00NTBjLTk5YzAtYzUwOWQyM2E3OGI2XkEyXkFqcGdeQXVyNTgyNTA4MjM.jpg','Onepunch-Man là một Manga thể loại siêu anh hùng với đặc trưng phồng tôm đấm phát chết luôn… Lol!!! Nhân vật chính trong Onepunch-man là Saitama, một con người mà nhìn đâu cũng thấy “tầm thường”, từ khuôn mặt vô hồn, cái đầu trọc lóc, cho tới thể hình long tong',567,4.9,'2023-12-01','2023-12-01',1),('B_017','Gia Tộc Điệp Viên Yozakura (REUP)',0,'US_001','ssdeheuheufegfdufdufhue.png','Taiyou Asano là 1 học sinh cao trung gặp vấn đề trong việc giao tiếp với mọi người. Bạn thời thơ ấu của cậu ta, Mutsumi Yozakura, là người duy nhất có thể nói chuyện bình thường với Taiyou. Rồi 1 ngày cậu phát hiện ra Mutsumi là thành viên của 1 gia đình điệp viên!',37,4.5,'2023-12-01','2023-12-01',1),('B_018','Deatte 5 Byou de Battle',0,'US_002','dwegwjqkndwjheugfdbchdw.jpg','Một ngày nọ, cậu học sinh cao trung mê game, cuồng kẹo Shiroyanagi Akira bị kéo vào một trận chiến bởi một cô gái bí ẩn tự xưng là Mion. Những người tham gia được thông báo rằng họ đã bị xóa tên khỏi hộ khẩu gia đình, tham gia vào một thí nghiệm và được ban sức mạnh đặc biệt.',333,3.7,'2023-12-01','2023-12-01',1),('B_019','Blue Lock',0,'US_001','sdbegdjegfjdgfshfyjegfyejgfdfguryteh.jpg','Yoichi Isagi đã bỏ lỡ cơ hội tham dự giải Cao Trung toàn quốc do đã chuyền cho đồng đội thay vì tự thân mình dứt điểm. Cậu là một trong 300 chân sút U-18 được tuyển chọn bởi Jinpachi Ego, người đàn ông được Hiệp Hội Bóng Đá Nhật Bản thuê sau hồi FIFA World Cup năm 2018, nhằm dẫn dắt Nhật Bản vô địch World Cup bằng cách tiêu diệt nền bóng đá Nhật Bản.',347,5.0,'2023-12-01','2023-12-01',1),('B_020','Gachi Akuta',0,'US_002','sdbwhhuewhruehturthnvdfndvi.jpg','Một khu ổ chuột nơi con cháu của những tên tội phạm sinh sống. Người dân bên kia biên giới coi thường anh như một bộ tộc và bị kỳ thị. Rudo, một đứa trẻ mồ côi, sống trong một khu ổ chuột với cha mẹ của mình, Legt, và kiếm sống bằng cách sử dụng những khả năng thể chất khác xa so với những người bình thường.',795,4.8,'2023-12-01','2023-12-01',1),('B_021','Gậy Gỗ Cấp 99+',0,'US_001','dgsjdbsndvbsjdbsndbsjdghbshdshj.jpg','Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!Thanh niên main trong game thực tế ảo bị gái lừa giết chết rồi vô tình được cho 1 chiếc gậy gỗ tân thủ. Bug game khiến cho main cường hóa cây gậy này lên cấp 99+ tối đa. Đây là phiên bản gậy gỗ Saitama - Gõ phát chết luôn!!!!!!!!!',254,4.6,'2023-12-02','2023-12-02',1),('B_022','Tomb Raider King',0,'US_002','98736tuyejwhdbshsgdwkjdsb.jpg','Hầm mộ của những vị thân xuất hiện ở khắp nơi trên thế giới, và ở những nơi đó cũng chôn cất rất nhiều thánh tích mang sức mạnh của những vị thần. Câu chuyện kể về một tên trộm với tài năng dị biệt muốn thu thập tất cả các thánh tích.',79,4.8,'2023-12-02','2023-12-02',1),('B_023','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','wdgfsyjhbdhsydhwuyeryr347eyhwudksh.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',75,4.7,'2023-12-02','2023-12-02',1),('B_024','Kengan Ashura',0,'US_002','sdgyejhdbeyr7ery47yrhusdbdhfbdjc.jpg','Từ thời Edo đã tồn tại các đầu trường, mà tại đó các thương gia thuê đấu sĩ đấu tay không với nhau, bên nào thắng sẽ có tất cả. Tokita Ouma, biệt danh là Ashura tham gia đấu trường và đánh thắng tất cả các đấu thủ của mình.',95,4.8,'2023-12-02','2023-12-02',1),('B_025','Tòa Tháp Bí Ẩn',0,'US_001','iturekjhdeygrhdejdbvhdvb.jpg','Mong muốn của bạn là gì ? Tiền ? Vinh quang ? Quyền lực ? sự báo thù ? hay một điều gì vượt trội hơn?Những gì mà bạn mong muốn ... đều ở đây !',57,4.2,'2023-12-02','2023-12-02',1),('B_026','Y Võ Chí Tôn',0,'US_001','hfuer3iuiejdefhdyjhbsjdbasjdbsn.jpg','Truyện tranh Y Võ Chí Tôn được cập nhật nhất và đầy đủ nhất tại TruyenTranhLH.net. Hãy ghé thăm TruyenTranhLH.net mỗi ngày để được đọc các chương mới nhất của Y Võ Chí Tôn.',77,4.8,'2023-12-02','2023-12-02',1),('B_027','VẠN TƯỚNG CHI VƯƠNG',0,'US_002','dehgfdehjdbwjfbyrt4ty3u.jpg','Lý lạc, Đệ nhất tướng thuật ngộ tính của học phủ nam phong? Chèn ép đồng bối, nhưng cũng là không tướng trời sinh, dần dần bị các bạn học đá ra phía sau. ',195,3.8,'2023-12-02','2023-12-02',1),('B_028','Area no kishi',0,'US_001','reury74736726474y37ryheudh.jpg','Nghĩ rằng mình là một thằng bất tài, Aizawa Kakeru từ bỏ giấc mơ cầu thủ để trở thành manager của đội bóng đá của trưởng. Nhưng thực chất cậu lại có một tài năng vô cùng tuyệt vời mà chỉ có Suguru - anh trai cậu đồng thời cũng là tuyển thủ của đội tuyển quốc gia Nhật Bản nhận ra được. Mọi chuyện ngày càng phức tạp hơn khi Seven - một người bạn thời thơ ấu mà Kakeru đem lòng yêu mến xuất hiện...',333,4.8,'2023-12-02','2023-12-02',1),('B_029','Naruto',0,'US_002','sdfrer454676.jpg','Naruto là một cậu bé có mơ ước trở thành hokage của làng Konoha,được Hokage phong ấn trong người một trong 9 quái vật của thể giới : Cửu vĩ Hồ ly.Vì cho cậu là một con quái vật, ko ai dám chơi với cậu!',421,4.1,'2023-12-02','2023-12-02',1),('B_030','Katsu!',0,'US_001','sdjnejfjefueijrwijewije83u4jeo2.jpg','Ờ thì trong một thành phố nào đó ở Nhật, có một chàng trai tình cờ gặp được một cô gái xinh đẹp. Do phải lòng nàng, chàng đã đăng kí vào một phòng tập boxing do cha nàng làm chủ, nhưng không may thay là cha mẹ nàng đã ly hôn còn nàng thì lại cực kì ghét boxing. Rồi chuyện tình éo le của đôi \"uyên ương\" này sẽ về đâu?',222,4.8,'2023-12-02','2023-12-02',1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history_increase_view`
--

LOCK TABLES `history_increase_view` WRITE;
/*!40000 ALTER TABLE `history_increase_view` DISABLE KEYS */;
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
INSERT INTO `users` VALUES ('US_001','Lai Van Quy','','quylang012@gmail.com','0221234343','Quyne','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','1232343434','Vietcombank',0),('US_002','Le Dinh Bao','','hjihi012@gmail.com','0243434328','Baone','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','9876545343','Vietcombank',0),('US_003','Nguyen Van A','','20110708@student.hcmute.edu.vn','0243434328','Nguyen Van A','$2a$10$apnHziowyxcWScMNcqvhUeOfsW8wWldaVEpb.jtqANDw1fPiNpFwW','987689787','Vietcombank',0);
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

-- Dump completed on 2023-12-02  1:18:52
