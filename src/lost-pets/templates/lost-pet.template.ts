import { LostPetCDto } from 'src/core/models/lost-pet.model';
import { generateMapboxStaticImage } from '../utils/utils';

export const generateLostPetEmailTemplate = (lostPet: LostPetCDto): string => {

    const mapboxUrl = generateMapboxStaticImage(
        lostPet.lat,
        lostPet.lon,
        lostPet.lat,
        lostPet.lon
    );

    return `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

            <h1 style="color: #e74c3c;">🐾 PetRadar - Mascota perdida registrada</h1>
            <p>Se ha registrado una nueva mascota perdida en el sistema.</p>

            <h2 style="color: #282424;">Datos de la mascota</h2>
            ${lostPet.photo_url ? `<img src="${lostPet.photo_url}" alt="Foto de ${lostPet.name}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px; margin-bottom:10px;"/>` : ''}
            <table style="width:100%; border-collapse: collapse;">
                <tr><td><strong>Nombre:</strong></td><td>${lostPet.name}</td></tr>
                <tr><td><strong>Especie:</strong></td><td>${lostPet.species}</td></tr>
                <tr><td><strong>Raza:</strong></td><td>${lostPet.breed}</td></tr>
                <tr><td><strong>Color:</strong></td><td>${lostPet.color}</td></tr>
                <tr><td><strong>Tamanio:</strong></td><td>${lostPet.size}</td></tr>
                <tr><td><strong>Descripcion:</strong></td><td>${lostPet.description}</td></tr>
                <tr><td><strong>Direccion:</strong></td><td>${lostPet.address}</td></tr>
                <tr><td><strong>Fecha que se perdio:</strong></td><td>${lostPet.lost_date}</td></tr>
            </table>


            <h2 style="color: #2980b9;">Contacto del duenio</h2>
            <table style="width:100%; border-collapse: collapse;">
                <tr><td><strong>Nombre:</strong></td><td>${lostPet.owner_name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>${lostPet.owner_email}</td></tr>
                <tr><td><strong>Telefono:</strong></td><td>${lostPet.owner_phone}</td></tr>
            </table>

            <h2 style="color: #c0392b;">Lugar donde se perdio</h2>
            <img src="${mapboxUrl}" alt="Mapa" style="width:100%; border-radius:8px;"/>

            
            <p style="color: #999; font-size: 12px;">🐾 PetRadar by Fernanda B </p>

        </body>
        </html>
    `;
};