import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PlayerService from '../services/PlayerService';

const PlayerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [player, setPlayer] = useState({
        playerName: '',
        jerseyNumber: '',
        role: '',
        totalMatches: '',
        teamName: '',
        countryOrState: '',
        description: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            fetchPlayer(id);
        }
    }, [id, isEditMode]);

    const fetchPlayer = async (playerId) => {
        setLoading(true);
        try {
            const data = await PlayerService.getPlayerById(playerId);
            setPlayer(data);
            setLoading(false);
        } catch (err) {
            setSubmitError('Failed to load player details');
            setLoading(false);
        }
    };

    const validateForm = async () => {
        const newErrors = {};
        const alphabetsOnly = /^[A-Za-z\s]+$/;

        // Player Name Validation
        if (!player.playerName.trim()) {
            newErrors.playerName = 'Name is required';
        } else if (!alphabetsOnly.test(player.playerName)) {
            newErrors.playerName = 'Name should only contain alphabets';
        }

        // Jersey Number Validation
        if (!player.jerseyNumber) {
            newErrors.jerseyNumber = 'Jersey number is required';
        } else {
            const jersey = parseInt(player.jerseyNumber);
            if (isNaN(jersey) || jersey < 1 || jersey > 99) {
                newErrors.jerseyNumber = 'Jersey number should be between 1-99';
            } else {
                // Check if jersey number already exists
                try {
                    const allPlayers = await PlayerService.getAllPlayers();
                    const duplicate = allPlayers.find(p => 
                        parseInt(p.jerseyNumber) === jersey && 
                        (!isEditMode || p.playerId.toString() !== id.toString())
                    );
                    if (duplicate) {
                        newErrors.jerseyNumber = 'Jersey number already exists';
                    }
                } catch (err) {
                    console.error('Error checking jersey uniqueness:', err);
                }
            }
        }

        // Role Validation
        if (!player.role) newErrors.role = 'Role is required';
        
        // Total Matches Validation
        if (!player.totalMatches) {
            newErrors.totalMatches = 'Total matches is required';
        } else {
            const matches = parseInt(player.totalMatches);
            if (isNaN(matches) || matches <= 0) {
                newErrors.totalMatches = 'Total matches should be greater than zero';
            }
        }

        // Team Name Validation
        if (!player.teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        } else if (!alphabetsOnly.test(player.teamName)) {
            newErrors.teamName = 'Team name should only contain alphabets';
        }

        // State/Country Validation
        if (!player.countryOrState.trim()) {
            newErrors.countryOrState = 'State/Country is required';
        } else if (!alphabetsOnly.test(player.countryOrState)) {
            newErrors.countryOrState = 'State/Country should only contain alphabets';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const isValid = await validateForm();
        if (!isValid) {
            setLoading(false);
            return;
        }

        setSubmitError(null);
        try {
            if (isEditMode) {
                await PlayerService.updatePlayer(id, player);
            } else {
                await PlayerService.createPlayer(player);
            }
            navigate('/');
        } catch (err) {
            setSubmitError(err.message || 'An error occurred during save');
            setLoading(false);
        }
    };

    if (loading && isEditMode && Object.keys(player).length === 0) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container pb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-header bg-primary text-white py-3">
                            <h3 className="card-title mb-0 text-center fw-bold">
                                {isEditMode ? 'Update Player Details' : 'Add New Player'}
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            {submitError && <div className="alert alert-danger mb-4 shadow-sm">{submitError}</div>}
                            
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Player Name</label>
                                        <input 
                                            name="playerName"
                                            value={player.playerName}
                                            onChange={handleChange}
                                            className={`form-control ${errors.playerName ? 'is-invalid' : ''}`}
                                            placeholder="Full Name (Alphabets only)"
                                        />
                                        {errors.playerName && <div className="invalid-feedback">{errors.playerName}</div>}
                                    </div>
                                    
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Jersey Number (1-99)</label>
                                        <input 
                                            name="jerseyNumber"
                                            type="number"
                                            value={player.jerseyNumber}
                                            onChange={handleChange}
                                            className={`form-control ${errors.jerseyNumber ? 'is-invalid' : ''}`}
                                            placeholder="Example: 10"
                                        />
                                        {errors.jerseyNumber && <div className="invalid-feedback">{errors.jerseyNumber}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Role</label>
                                        <select 
                                            name="role"
                                            value={player.role}
                                            onChange={handleChange}
                                            className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Batsman">Batsman</option>
                                            <option value="Bowler">Bowler</option>
                                            <option value="All Rounder">All Rounder</option>
                                            <option value="Wicket Keeper">Wicket Keeper</option>
                                        </select>
                                        {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Total Matches (&gt; 0)</label>
                                        <input 
                                            name="totalMatches"
                                            type="number"
                                            value={player.totalMatches}
                                            onChange={handleChange}
                                            className={`form-control ${errors.totalMatches ? 'is-invalid' : ''}`}
                                            placeholder="Total matches played"
                                        />
                                        {errors.totalMatches && <div className="invalid-feedback">{errors.totalMatches}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Team Name</label>
                                        <input 
                                            name="teamName"
                                            value={player.teamName}
                                            onChange={handleChange}
                                            className={`form-control ${errors.teamName ? 'is-invalid' : ''}`}
                                            placeholder="Team name (Alphabets only)"
                                        />
                                        {errors.teamName && <div className="invalid-feedback">{errors.teamName}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Country / State</label>
                                        <input 
                                            name="countryOrState"
                                            value={player.countryOrState}
                                            onChange={handleChange}
                                            className={`form-control ${errors.countryOrState ? 'is-invalid' : ''}`}
                                            placeholder="Country or State (Alphabets only)"
                                        />
                                        {errors.countryOrState && <div className="invalid-feedback">{errors.countryOrState}</div>}
                                    </div>

                                    <div className="col-12">
                                        <label className="form-label fw-semibold">Description (Optional)</label>
                                        <textarea 
                                            name="description"
                                            value={player.description}
                                            onChange={handleChange}
                                            className="form-control"
                                            rows="3"
                                            placeholder="Short player summary..."
                                        ></textarea>
                                    </div>
                                    
                                    <div className="col-12 mt-4 d-flex justify-content-between">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary px-4 py-2"
                                            onClick={() => navigate('/')}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary px-5 py-2 shadow"
                                            disabled={loading}
                                        >
                                            {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : ''}
                                            {isEditMode ? 'Update Player' : 'Save Player'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerForm;
