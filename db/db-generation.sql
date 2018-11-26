CREATE SCHEMA `cheq_exercise` ;

CREATE TABLE `cheq_exercise`.`vasts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `vast_url` VARCHAR(100) NOT NULL,
    `position` ENUM('top_left', 'top_middle', 'top_right', 'middle_left', 'middle_right', 'bottom_left', 'bottom_middle', 'bottom_right') NOT NULL DEFAULT 'bottom_right',
    `hide_ui` TINYINT(1) NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `cheq_exercise`.`vasts` 
ADD UNIQUE INDEX `vast_url_UNIQUE` (`vast_url` ASC);