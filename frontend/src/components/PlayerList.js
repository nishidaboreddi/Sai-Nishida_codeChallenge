import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayerService from '../services/PlayerService';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSorted, setIsSorted] = useState(false);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        if (searchId === '') {
            fetchPlayers();
        }
    }, [searchId, isSorted]);

    const fetchPlayers = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = isSorted 
                ? await PlayerService.getPlayersByMatchesAsc() 
                : await PlayerService.getAllPlayers();
            setPlayers(data);
            setLoading(false);
        } catch (err) {
            setError(`Failed to fetch players: ${err.message}`);
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchId.trim()) {
            fetchPlayers();
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const player = await PlayerService.getPlayerById(searchId);
            setPlayers([player]);
            setLoading(false);
        } catch (err) {
            setPlayers([]);
            setError(`Player with ID ${searchId} not found.`);
            setLoading(false);
        }
    };

    const handleSortToggle = () => {
        setIsSorted(!isSorted);
        setSearchId(''); // Clear search when sorting
    };

    const handleDelete = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete player "${name}"?`)) {
            try {
                await PlayerService.deletePlayer(id);
                setPlayers(players.filter(p => p.playerId !== id));
            } catch (err) {
                alert('Failed to delete player');
            }
        }
    };

    if (loading && players.length === 0 && !error) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container pb-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <h2 className="fw-bold mb-0">Player Management</h2>
                
                <div className="d-flex align-items-center gap-2">
                    <form onSubmit={handleSearch} className="input-group shadow-sm" style={{ maxWidth: '250px' }}>
                        <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Search ID..." 
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form>

                    <div className="btn-group shadow-sm">
                        <button 
                            onClick={handleSortToggle} 
                            className={`btn ${isSorted ? 'btn-info text-white' : 'btn-outline-info'}`}
                        >
                            Sort by Matches
                        </button>
                        <button onClick={() => { setSearchId(''); setIsSorted(false); fetchPlayers(); }} className="btn btn-outline-secondary">
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
            
            {error && <div className="alert alert-warning shadow-sm d-flex justify-content-between align-items-center">
                <span>{error}</span>
                <button className="btn btn-sm btn-outline-warning border-0" onClick={() => {setSearchId(''); fetchPlayers();}}>Clear</button>
            </div>}
            
            <div className="card shadow border-0 overflow-hidden">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="py-3">Name</th>
                                    <th className="py-3">Jersey #</th>
                                    <th className="py-3">Role</th>
                                    <th className="py-3">Matches</th>
                                    <th className="py-3">Team</th>
                                    <th className="py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center py-5 text-muted">No players found matching your criteria.</td>
                                    </tr>
                                ) : (
                                    players.map(player => (
                                        <tr key={player.playerId} className="align-middle border-bottom">
                                            <td className="px-4 py-3 text-muted">{player.playerId}</td>
                                            <td className="fw-semibold">{player.playerName}</td>
                                            <td><span className="badge rounded-circle bg-light text-dark border p-2">{player.jerseyNumber}</span></td>
                                            <td><span className="badge bg-secondary-subtle text-secondary px-3">{player.role}</span></td>
                                            <td>{player.totalMatches}</td>
                                            <td>{player.teamName}</td>
                                            <td className="text-center py-3">
                                                <div className="btn-group btn-group-sm rounded-pill border overflow-hidden p-1 shadow-sm">
                                                    <Link 
                                                        to={`/edit-player/${player.playerId}`} 
                                                        className="btn btn-light border-0"
                                                        title="Edit Player"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(player.playerId, player.playerName)}
                                                        className="btn btn-light border-0 text-danger"
                                                        title="Delete Player"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerList;
