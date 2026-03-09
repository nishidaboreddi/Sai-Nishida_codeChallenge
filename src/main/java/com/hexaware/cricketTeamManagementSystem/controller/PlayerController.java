package com.hexaware.cricketTeamManagementSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.cricketTeamManagementSystem.dto.PlayerDTO;
import com.hexaware.cricketTeamManagementSystem.service.IPlayerService;

@RestController
@RequestMapping("/api/players")

public class PlayerController {

    @Autowired
    private IPlayerService service;

    @GetMapping
    public List<PlayerDTO> getPlayers() {

        return service.getAllPlayers();
    }

    @PostMapping
    public PlayerDTO createPlayer(@RequestBody PlayerDTO dto) {

        return service.createPlayer(dto);
    }

    @GetMapping("/{id}")
    public PlayerDTO getPlayer(@PathVariable Long id) {

        return service.getPlayerById(id);
    }

    @PutMapping("/{id}")
    public PlayerDTO updatePlayer(@PathVariable Long id, @RequestBody PlayerDTO dto) {

        return service.updatePlayer(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable Long id) {

        service.deletePlayer(id);
    }
}