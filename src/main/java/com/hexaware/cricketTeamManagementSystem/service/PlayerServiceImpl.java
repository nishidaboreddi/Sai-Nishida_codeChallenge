package com.hexaware.cricketTeamManagementSystem.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.cricketTeamManagementSystem.exception.PlayerNotFoundException;
import com.hexaware.cricketTeamManagementSystem.dto.PlayerDTO;
import com.hexaware.cricketTeamManagementSystem.entity.Player;
import com.hexaware.cricketTeamManagementSystem.repo.PlayerRepository;
import com.hexaware.springrest.datajpa.entity.Employee;

@Service
public class PlayerServiceImpl implements IPlayerService {

    @Autowired
    private PlayerRepository repository;

    private Player convertToEntity(PlayerDTO dto) {

        Player player = new Player();

        player.setPlayerId(dto.getPlayerId());
        player.setPlayerName(dto.getPlayerName());
        player.setJerseyNumber(dto.getJerseyNumber());
        player.setRole(dto.getRole());
        player.setTotalMatches(dto.getTotalMatches());
        player.setTeamName(dto.getTeamName());
        player.setCountryOrState(dto.getCountryOrState());
        player.setDescription(dto.getDescription());

        return player;
    }

    private PlayerDTO convertToDTO(Player player) {

        PlayerDTO dto = new PlayerDTO();

        dto.setPlayerId(player.getPlayerId());
        dto.setPlayerName(player.getPlayerName());
        dto.setJerseyNumber(player.getJerseyNumber());
        dto.setRole(player.getRole());
        dto.setTotalMatches(player.getTotalMatches());
        dto.setTeamName(player.getTeamName());
        dto.setCountryOrState(player.getCountryOrState());
        dto.setDescription(player.getDescription());

        return dto;
    }

    @Override
    public PlayerDTO createPlayer(PlayerDTO dto) {

        Player player = convertToEntity(dto);

        Player saved = repository.save(player);

        return convertToDTO(saved);
    }

    @Override
    public PlayerDTO updatePlayer(Long id, PlayerDTO dto) {

        Player player = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found"));

        player.setPlayerName(dto.getPlayerName());
        player.setJerseyNumber(dto.getJerseyNumber());
        player.setRole(dto.getRole());
        player.setTotalMatches(dto.getTotalMatches());
        player.setTeamName(dto.getTeamName());
        player.setCountryOrState(dto.getCountryOrState());
        player.setDescription(dto.getDescription());

        Player updated = repository.save(player);

        return convertToDTO(updated);
    }

    @Override
    public PlayerDTO getPlayerById(Long id) {

        Player player = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found"));

        return convertToDTO(player);
    }

    @Override
    public List<PlayerDTO> getAllPlayers() {

        return repository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deletePlayer(Long id) {

        Player player = repository.findById(id)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found"));

        repository.delete(player);
    }
    
}