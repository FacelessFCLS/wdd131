import pygame
import weapon as weapon
import constants as constants
import math

class Character():
    def __init__(self, x, y, health, mob_animations, char_type, boss, size):
        self.char_type = char_type
        self.boss = boss
        self.score = 0
        self.flip = False
        self.animation_list = mob_animations[char_type]
        self.frame_index = 0
        self.action = 0 #0: idle, 1: run
        self.update_time = pygame.time.get_ticks()
        self.running = False
        self.health = health
        self.alive = True
        self.hit = False
        self.last_hit_time = pygame.time.get_ticks()
        self.last_attack = pygame.time.get_ticks()
        self.stunned = False

        self.image = self.animation_list[self.action][self.frame_index]
        self.rect = pygame.Rect(0, 0, constants.TILE_SIZE * size, constants.TILE_SIZE * size)
        self.rect.center = (x, y)

    def move(self, dx, dy, obstacle_tiles, exit_tile = None):
        screen_scroll = [0, 0]
        level_complete = False
        self.running = False
        if dx != 0 or dy != 0:
            self.running = True

        if dx < 0:
            self.flip = True
        if dx > 0:
            self.flip = False

        #control diagonal movement
        if dx != 0 and dy != 0:
            dx  = dx * (math.sqrt(2) / 2)
            dy  = dy * (math.sqrt(2) / 2)
            
        #check for collision with map in x direction
        self.rect.x += dx
        for obstacle in obstacle_tiles:
            if obstacle[1].colliderect(self.rect):
                if dx > 0:
                    self.rect.right = obstacle[1].left
                if dx < 0:
                    self.rect.left = obstacle[1].right

        #check for collision with map in y direction
        self.rect.y += dy
        for obstacle in obstacle_tiles:
            if obstacle[1].colliderect(self.rect):
                if dy > 0:
                    self.rect.bottom = obstacle[1].top
                if dy < 0:
                    self.rect.top = obstacle[1].bottom

        #logic only applicable to player character, not enemies
        if self.char_type == 0:
            #check collision with exit tile
            if exit_tile[1].colliderect(self.rect):
                #ensure player is close to center of tile
                exit_dist = math.sqrt((self.rect.centerx - exit_tile[1].centerx) ** 2 + (self.rect.centery - exit_tile[1].centery) ** 2)
                if exit_dist < 20:
                    level_complete = True

            #update scroll based on player position
            #move camera left or right
            if self.rect.right > (constants.SCREEN_WIDTH - constants.SCROLL_THRESH):
                screen_scroll[0] = (constants.SCREEN_WIDTH - constants.SCROLL_THRESH) - self.rect.right
                self.rect.right = constants.SCREEN_WIDTH - constants.SCROLL_THRESH
            if self.rect.left < constants.SCROLL_THRESH:
                screen_scroll[0] = constants.SCROLL_THRESH - self.rect.left
                self.rect.left = constants.SCROLL_THRESH
            
            #move camera up or down
            if self.rect.bottom > (constants.SCREEN_HEIGHT - constants.SCROLL_THRESH):
                screen_scroll[1] = (constants.SCREEN_HEIGHT - constants.SCROLL_THRESH) - self.rect.bottom
                self.rect.bottom = constants.SCREEN_HEIGHT - constants.SCROLL_THRESH
            if self.rect.top < constants.SCROLL_THRESH:
                screen_scroll[1] = constants.SCROLL_THRESH - self.rect.top
                self.rect.top = constants.SCROLL_THRESH
        
        return screen_scroll, level_complete
            
    def ai(self, player, obstacle_tiles, screen_scroll, fireball_image):
        clipped_line = ()
        stun_cooldown = 100
        ai_dx = 0
        ai_dy = 0
        fireball = None

        #reposition mobs based on screen scroll
        self.rect.x += screen_scroll[0]
        self.rect.y += screen_scroll[1]

        #create line of sight for enemy to player
        line_of_sight = ((self.rect.centerx, self.rect.centery), (player.rect.centerx, player.rect.centery))

        #check if line of sight collides with any obstacles
        for obstacle in obstacle_tiles:
            if obstacle[1].clipline(line_of_sight):
                clipped_line = obstacle[1].clipline(line_of_sight)

        #check distance to player
        dist = math.sqrt(((self.rect.centerx - player.rect.centerx)) ** 2 + ((self.rect.centery - player.rect.centery) ** 2))
        if not clipped_line and dist > constants.RANGE:

            if self.rect.centerx > player.rect.centerx:
                ai_dx = -constants.ENEMY_SPEED
            if self.rect.centerx < player.rect.centerx:
                ai_dx = constants.ENEMY_SPEED
            if self.rect.centery > player.rect.centery:
                ai_dy = -constants.ENEMY_SPEED
            if self.rect.centery < player.rect.centery:
                ai_dy = constants.ENEMY_SPEED

        if self.alive:
            if not self.stunned:
                #move toward player
                self.move(ai_dx, ai_dy, obstacle_tiles)
                
                #Attack Player
                if dist < constants.ATTACK_RANGE and player.hit == False:
                    player.health -= 10
                    player.hit = True
                    player.last_hit_time = pygame.time.get_ticks()
                #boss enemy special attack
                fireball_cooldown = 1000
                if self.boss:
                    if dist < 500:
                        if pygame.time.get_ticks() - self.last_attack >= fireball_cooldown:
                            fireball = weapon.Fireball(fireball_image, self.rect.centerx, self.rect.centery, player.rect.centerx, player.rect.centery)
                            self.last_attack = pygame.time.get_ticks()


            #check if hit
            if self.hit == True:
                self.hit = False
                self.last_hit_time = pygame.time.get_ticks()
                self.stunned = True
                self.running = False
                self.update_action(0)

            if (pygame.time.get_ticks() - self.last_hit_time) > stun_cooldown:
                self.stunned = False

        return fireball

    def update(self):
        #Check if character has died
        if self.health <= 0:
            self.health = 0
            self.alive = False

        #timer to reset player hit status after being hit
        hit_cooldown = 1000
        if self.char_type ==0:
            if self.hit== True and pygame.time.get_ticks() - self.last_hit_time > hit_cooldown:
                self.hit = False

        #check what action the player is performing
        if self.running == True:
            self.update_action(1) #1: run
        else:
            self.update_action(0) #0: idle

        #update animation
        animation_cooldown = 70
        #update image depending on current frame
        self.image = self.animation_list[self.action][self.frame_index]
        #check if enough time has passed since the last update
        if pygame.time.get_ticks() - self.update_time > animation_cooldown:
            self.update_time = pygame.time.get_ticks()
            self.frame_index += 1
        #if the animation has run out, reset back to the start
        if self.frame_index >= len(self.animation_list[self.action]):
            self.frame_index = 0

    def update_action(self, new_action):
        #check if the new action is different to the previous one
        if new_action != self.action:
            self.action = new_action
            #update the animation settings
            self.frame_index = 0
            self.update_time = pygame.time.get_ticks()

    def draw(self, surface):
        flipped_image = pygame.transform.flip(self.image, self.flip, False)
        if self.char_type == 0: #elf
            surface.blit(flipped_image, (self.rect.x, self.rect.y - constants.SCALE * constants.OFFSET)) #offset to align the character's feet with the ground
        else:
            surface.blit(flipped_image, self.rect)