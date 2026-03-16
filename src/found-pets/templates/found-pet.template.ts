import { FoundPetCDto } from 'src/core/models/found-pet.model';
import { LostPet } from 'src/core/entities/lost-pet.entity';
import { generateMapboxStaticImage } from '../utils/utils';

export const generateFoundPetEmailTemplate = (foundPet: FoundPetCDto, lostPet: LostPet): string => {

    const lostLon = lostPet.location.coordinates[0];
    const lostLat = lostPet.location.coordinates[1];

    const mapboxUrl = generateMapboxStaticImage(
        lostLat,
        lostLon,
        foundPet.lat,
        foundPet.lon
    );

    return `
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">

            <h1 style="color: #e67e22;">🐾 PetRadar - Posible coincidencia</h1>
            <p>Se registro una mascota encontrada cerca de donde se perdio <strong>${lostPet.name}</strong>.</p>

            <h2 style="color: #c0392b;">Mascota perdida</h2>
            ${lostPet.photo_url ? `<img src="${lostPet.photo_url}" alt="Foto de ${lostPet.name}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px; margin-bottom:10px;"/>` : ''}
            <table style="width:100%; border-collapse: collapse;">
                <tr><td><strong>Nombre:</strong></td><td>${lostPet.name}</td></tr>
                <tr><td><strong>Especie:</strong></td><td>${lostPet.species}</td></tr>
                <tr><td><strong>Raza:</strong></td><td>${lostPet.breed}</td></tr>
                <tr><td><strong>Color:</strong></td><td>${lostPet.color}</td></tr>
                <tr><td><strong>Tamanio:</strong></td><td>${lostPet.size}</td></tr>
                <tr><td><strong>Descripcion:</strong></td><td>${lostPet.description}</td></tr>
                <tr><td><strong>Direccion donde se perdio:</strong></td><td>${lostPet.address}</td></tr>
                <tr><td><strong>Fecha que se perdio:</strong></td><td>${lostPet.lost_date}</td></tr>
                <tr><td><strong>Duenio:</strong></td><td>${lostPet.owner_name}</td></tr>
                <tr><td><strong>Email duenio:</strong></td><td>${lostPet.owner_email}</td></tr>
                <tr><td><strong>Telefono duenio:</strong></td><td>${lostPet.owner_phone}</td></tr>
            </table>

            <h2 style="color: #27ae60;">Mascota encontrada</h2>
            ${foundPet.photo_url ? `<img src="${foundPet.photo_url}" alt="Foto mascota encontrada" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px; margin-bottom:10px;"/>` : ''}
            <table style="width:100%; border-collapse: collapse;">
                <tr><td><strong>Especie:</strong></td><td>${foundPet.species}</td></tr>
                <tr><td><strong>Raza:</strong></td><td>${foundPet.breed ?? 'No identificada'}</td></tr>
                <tr><td><strong>Color:</strong></td><td>${foundPet.color}</td></tr>
                <tr><td><strong>Tamanio:</strong></td><td>${foundPet.size}</td></tr>
                <tr><td><strong>Descripcion:</strong></td><td>${foundPet.description}</td></tr>
                <tr><td><strong>Direccion donde se encontro:</strong></td><td>${foundPet.address}</td></tr>
                <tr><td><strong>Fecha que se encontro:</strong></td><td>${foundPet.found_date}</td></tr>
            </table>

            <h2 style="color: #2980b9;">Contacto de quien la encontro</h2>
            <table style="width:100%; border-collapse: collapse;">
                <tr><td><strong>Nombre:</strong></td><td>${foundPet.finder_name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>${foundPet.finder_email}</td></tr>
                <tr><td><strong>Telefono:</strong></td><td>${foundPet.finder_phone}</td></tr>
            </table>

            <h2 style="color: #c0392b;">Mapa de ubicaciones</h2>
            <p>Pin rojo: donde se perdio <strong>${lostPet.name}</strong></p>
            <p>Pin verde: donde fue encontrada</p>
            <img src="${mapboxUrl}" alt="Mapa de ubicaciones" style="width:100%; border-radius:8px;"/>

            <p style="color: #999; font-size: 12px;">🐾 PetRadar by Fernanda B</p>

        </body>
        </html>
    `;
};