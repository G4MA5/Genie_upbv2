import QRCode from "qrcode";

// QR code en image PNG. Le contenu est uniquement le jeton opaque du badge :
// aucune donnée personnelle n'y figure.
export function genererQrPng(jeton) {
  return QRCode.toBuffer(jeton, {
    type: "png",
    width: 480,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}
