import pygame
import constants as constants
import math
import random

class Weapon():
    def __init__(self, image, arrow_image):
        self.original_image = image
        self.angle = 0
        self.image = pygame.transform.rotate(self.original_image, self.angle)
        self.arrow_image = arrow_image
        self.rect = self.image.get_rect()
        self.fired = False
        #***Reload delay code, not implemented yet.
        #***self.last_shot_time = pygame.time.get_ticks()

    def update(self, player):
        #***Reload delay code, not implemented yet.
        #***shot_cooldown = 300 #milliseconds
        arrow = None

        # Position the weapon relative to the player
        self.rect.center = player.rect.center

        # Rotate the weapon based on the player's movement direction
        pos = pygame.mouse.get_pos()
        x_distance = pos[0] - self.rect.centerx
        y_distance = -(pos[1] - self.rect.centery) #-- because the y increased down screen
        self.angle = math.degrees(math.atan2(y_distance, x_distance))
        
        #get mouse click
        if pygame.mouse.get_pressed()[0] and self.fired == False:  #***and (pygame.time.get_ticks() - self.last_shot_time) >= shot_cooldown):
            #create arrow
            arrow = Arrow(self.arrow_image, self.rect.centerx, self.rect.centery, self.angle)
            self.fired = True
            #***self.last_shot_time = pygame.time.get_ticks()
        #reset mouse click
        if pygame.mouse.get_pressed()[0] == False:
            self.fired = False

        return arrow
    
    def draw(self, surface):
        self.image = pygame.transform.rotate(self.original_image, self.angle)
        surface.blit(self.image, ((self.rect.centerx - int(self.image.get_width() / 2)), (self.rect.centery - int(self.image.get_height() / 2))))

class Arrow(pygame.sprite.Sprite):
    def __init__(self, image, x, y, angle):
        pygame.sprite.Sprite.__init__(self)
        self.original_image = image
        self.angle = angle
        self.image = pygame.transform.rotate(self.original_image, self.angle - 90) #-- because the original image is facing up, but the angle is calculated with 0 degrees facing right
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        #calculate horizontal and vertical speeds based on angle
        self.dx = math.cos(math.radians(self.angle)) *  constants.ARROW_SPEED
        self.dy = -(math.sin(math.radians(self.angle)) * constants.ARROW_SPEED) #-- because the y increased down screen

    def update(self, screen_scroll, obstacle_tiles, enemy_list):
        #reset variable for damage text
        damage = 0
        damage_pos = None

        #reposition based on speed
        self.rect.x += screen_scroll[0] + self.dx
        self.rect.y += screen_scroll[1] + self.dy

        #check for collision between arrows and walls
        for obstacle in obstacle_tiles:
            if obstacle[1].colliderect(self.rect):
                self.kill() #remove arrow if it hits a wall

        #remove arrow if it goes off screen
        if self.rect.right < 0 or self.rect.left > constants.SCREEN_WIDTH or self.rect.bottom < 0 or self.rect.top > constants.SCREEN_HEIGHT:
            self.kill()

        #Check collision between arrow and enemy
        for enemy in enemy_list:
            if self.rect.colliderect(enemy.rect) and enemy.alive:
                damage = 10 + random.randint(-5, 5) #base damage with a little random variation
                damage_pos = enemy.rect
                enemy.health -= damage
                enemy.hit = True
                self.kill() #remove arrow after it hits an enemy
                break #only allow one enemy to be hit per arrow
        return damage, damage_pos

    def draw(self, surface):
        surface.blit(self.image, ((self.rect.centerx - int(self.image.get_width() / 2)), (self.rect.centery - int(self.image.get_height() / 2))))


class Fireball(pygame.sprite.Sprite):
    def __init__(self, image, x, y, target_x, target_y):
        pygame.sprite.Sprite.__init__(self)
        self.original_image = image
        x_dist = target_x - x
        y_dist = -(target_y - y)
        
        # Calculate angle towards target
        self.angle = math.degrees(math.atan2(y_dist, x_dist))
        self.image = pygame.transform.rotate(self.original_image, self.angle - 90) #-- because the original image is facing up, but the angle is calculated with 0 degrees facing right
        self.rect = self.image.get_rect()
        self.rect.center = (x, y)
        #calculate horizontal and vertical speeds based on angle
        self.dx = math.cos(math.radians(self.angle)) *  constants.FIREBALL_SPEED
        self.dy = -(math.sin(math.radians(self.angle)) * constants.FIREBALL_SPEED) #-- because the y increased down screen

    def update(self, screen_scroll, player):

        #reposition based on speed
        self.rect.x += screen_scroll[0] + self.dx
        self.rect.y += screen_scroll[1] + self.dy


        #remove fireball if it goes off screen
        if self.rect.right < 0 or self.rect.left > constants.SCREEN_WIDTH or self.rect.bottom < 0 or self.rect.top > constants.SCREEN_HEIGHT:
            self.kill()

        #Check collision between fireball and player
        if player.rect.colliderect(self.rect) and player.hit == False:
            player.hit = True
            player.last_hit_time = pygame.time.get_ticks()
            player.health -= 10
            self.kill() #remove fireball after it hits the player

    def draw(self, surface):
        surface.blit(self.image, ((self.rect.centerx - int(self.image.get_width() / 2)), (self.rect.centery - int(self.image.get_height() / 2))))