const { Favoritos } = require('../../database/models/'); // Adjust the path as necessary

module.exports = async function deleteFavoritos(req, res) {
    const { id } = req.params;

    try {
        const result = await Favoritos.destroy({
            where: { id: id }
        });
        if (result === 0) {
            return res.status(404).json({ message: 'Favorito not found' });
        }
        return res.status(200).json({ message: 'Favorito deleted successfully' });
    } catch (error) {
        console.error('Error deleting favorito:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}