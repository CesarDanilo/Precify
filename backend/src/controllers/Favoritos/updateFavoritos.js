const { Favoritos } = require('../../models/Favoritos'); // Adjust the path as necessary

export default async function updateFavoritos(req, res) {
    const { id } = req.params;
    const { favorito } = req.body;
    if (!id || !favorito) {
        return res.status(400).json({ message: 'ID and favorito data are required' });
    }
    try {
        // Assuming you have a database function to update a favorite
        const updatedFavorito = await Favoritos.update(id, favorito);

        if (!updatedFavorito) {
            return res.status(404).json({ message: 'Favorito not found' });
        }

        return res.status(200).json(updatedFavorito);
    } catch (error) {
        console.error('Error updating favorito:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}