export const invoiceTemplate = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f5f5f5;
      }

      /* Franja superior gris */
      .top-bar {
        background-color: #d3d3d3;
        height: 40px;
      }

      /* Contenedor principal */
      .container {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: white;
        border: 2px solid #0047AB;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
      }

      /* División en dos columnas */
      .flex-container {
        display: flex;
        justify-content: space-between;
      }

      /* Caja izquierda con QR y logos */
      .left-box {
        flex: 1;
        border: 1px solid #0047AB;
        padding: 15px;
        text-align: center;
        background-color: #f9f9f9;
      }

      .logo {
        width: 100px;
        margin-bottom: 10px;
      }

      .small-text {
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }

      .qr-code {
        width: 150px;
        height: 150px;
        border: 3px solid #0047AB;
        padding: 5px;
      }

      .gray-text {
        color: gray;
        font-size: 14px;
        margin-top: 10px;
      }

      /* Caja derecha con título y fecha */
      .right-box {
        flex: 1;
        padding: 15px;
        border: 1px solid #0047AB;
      }

      .title {
        font-size: 22px;
        font-weight: bold;
        color: #0047AB;
        text-align: center;
        margin-bottom: 20px;
      }

      /* Tabla de datos */
      .data-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      .data-table th,
      .data-table td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }

      .data-table th {
        background-color: #0047AB;
        color: white;
      }
    </style>
  </head>
  <body>
    <!-- Franja gris superior -->
    <div class="top-bar"></div>

    <!-- Contenedor principal -->
    <div class="container">

      <!-- Sección con dos cuadros -->
      <div class="flex-container">
        <!-- Izquierda: QR y logos -->
        <div class="left-box">
          <h3>Constancia de Situación Fiscal</h3>
          <img src="https://politicomx-politicomx-prod.web.arc-cdn.net/resizer/v2/KK5HMXN3MZA37CQDXXTGJUZ7HM.png?auth=ec3717667db6bdd33f13bfa3961182a7a406fece2b592eaf47f81f9efe3ba59b&quality=55&width=800&height=447" class="logo" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFPj4k9ut4AsHsHvXEZp030LXhBxxBwzaNYg&s" class="logo" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtcEHE3Gr1eQZHsB-EL-tToo93sckoltR4A&s/" class="qr-code" />
          <p class="gray-text">Escanea el código QR para validar en el SAT</p>
        </div>

        <!-- Derecha: Título y fecha -->
        <div class="right-box">
          <div class="title">📄 Factura Electrónica</div>
          <p><strong>Lugar de emisión:</strong> Ciudad de México, México</p>
          <p><strong>Fecha de emisión:</strong> 08/05/2025</p>
          <p class="small-text">
            <strong>Productos Adquiridos:</strong> <br />
            - Laptop ASUS X515 ($800) - IVA: $128 <br />
            - Monitor Dell 24" ($250) - IVA: $40 <br />
            - Teclado mecánico Logitech ($120) - IVA: $19.20 <br />
            - Mouse inalámbrico HP ($50) - IVA: $8
          </p>
        </div>
      </div>

      <!-- Tabla de datos -->
      <table class="data-table">
        <tr>
          <th>RFC</th>
          <td>XAAX01010001001</td>
        </tr>
        <tr>
          <th>CURP</th>
          <td>XAAX01010001001MDFBRS01</td>
        </tr>
        <tr>
          <th>Nombre</th>
          <td>Carlos Henríquez</td>
        </tr>
        <tr>
          <th>Fecha de Inicio de Operaciones</th>
          <td>08 de Mayo de 2025</td>
        </tr>
        <tr>
          <th>Estatus en el padrón</th>
          <td>ACTIVO</td>
        </tr>
        <tr>
          <th>Monto Total</th>
          <td>$1,220.00</td>
        </tr>
        <tr>
          <th>IVA (16%)</th>
          <td>$195.20</td>
        </tr>
        <tr>
          <th>Total con IVA</th>
          <td>$1,415.20</td>
        </tr>
      </table>

    </div>
  </body>
</html>
`;
