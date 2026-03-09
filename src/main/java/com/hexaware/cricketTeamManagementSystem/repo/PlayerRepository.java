package com.hexaware.cricketTeamManagementSystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.cricketTeamManagementSystem.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

}