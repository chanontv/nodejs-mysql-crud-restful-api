CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `products_id` varchar(100) NOT NULL,
  `total_price` int NOT NULL,
  `address` varchar(200) NOT NULL,
  `status` varchar(150) NOT NULL DEFAULT 'placed_order',
  `order_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
