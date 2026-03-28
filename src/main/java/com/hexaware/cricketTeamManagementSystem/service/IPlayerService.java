package com.hexaware.cricketTeamManagementSystem.service;

import java.util.List;

import com.hexaware.cricketTeamManagementSystem.dto.PlayerDTO;

public interface IPlayerService {

    PlayerDTO createPlayer(PlayerDTO dto);

    PlayerDTO updatePlayer(Long id, PlayerDTO dto);

    PlayerDTO getPlayerById(Long id);

    List<PlayerDTO> getAllPlayers();

    void deletePlayer(Long id);
}