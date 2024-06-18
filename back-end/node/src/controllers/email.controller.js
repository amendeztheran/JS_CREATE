import nodemailer from 'nodemailer';

export const envioCorreo = (user, address, orderDetails) => {
    try {
        //const htmlContent = `<h1>Hola ${user.name}, tu orden ha sido recibida y está siendo procesada</h1><p>Este es un correo electrónico de prueba con contenido HTML.</p>`;
        console.log('Envío correo exitosamente');

        // Obtener el nombre del cliente del objeto user
        const nombreCliente = user.name;

        // Obtener la fecha y hora actual en tiempo real
        const currentDate = new Date();

        // Formatear la fecha y hora actual según el formato deseado
        const formattedDate = currentDate.toLocaleString('es-ES', {
            timeZone: 'America/Bogota', // Especificar la zona horaria deseada
            day: '2-digit',  // Obtener el día en formato de dos dígitos
            month: '2-digit', // Obtener el mes en formato de dos dígitos
            year: 'numeric', // Obtener el año en formato de cuatro dígitos
            hour: '2-digit', // Obtener la hora en formato de dos dígitos
            minute: '2-digit', // Obtener el minuto en formato de dos dígitos
            second: '2-digit' // Obtener el segundo en formato de dos dígitos
        });

        // Concatenar la fecha y hora al asunto del correo electrónico
        const subjectWithDate = `CREATE SHOP: Orden pedido - ${formattedDate}`;

        // Usar el contenido del mensaje recibido desde el frontend
        /*const htmlContent = `
        <p>${address}</p>
        <p>${JSON.stringify(orderDetails)}</p>
        `/*`<h1>prueba3</h1><p>Este es un correo electrónico de prueba con contenido HTML.</p>`;*/

        // Crear el contenido HTML de la tabla para los productos
        let productsTableHTML = '';
        for (const product of orderDetails) {
            productsTableHTML += `
                <tr class="table-light">
                    <td style="border: 1px solid #dddddd;"><img src="${product.url}" style="max-width: 100px; max-height: 100px;"></td>
                    <td style="border: 1px solid #dddddd; font-size: 18px;">${product.title}</td>
                    <td style="border: 1px solid #dddddd; font-size: 18px;">${product.descrip}</td>
                    <td style="border: 1px solid #dddddd; font-size: 18px;">${product.price}</td>
                    <td style="text-align: center; border: 1px solid #dddddd; font-size: 18px;">${product.quantify}</td>
                    <td style="border: 1px solid #dddddd; font-size: 18px;">${product.total}</td>
                </tr>
            `;
        }/*Corregir: quantify*/
        
        /*Corregir */
        let valorTotal = 0; // 
        for (const product of orderDetails) {
            valorTotal += parseFloat(product.total); // Suma total de cada producto al valor total
        }

        /*<p>${address}</p> */
        const htmlContent = `
            <!--Cuadro 1: Presentación de agradecimiento de compra del cliente-->
            <div style="background-color: rgba(255, 255, 255, 0.973);">
            <div style="border: 1px solid black; padding: 20px; width: 1000px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top: 50px; background-color: black;">
            <div style="display: flex; justify-content: center; align-items: center; height: auto; ">
            <!--Cuadro 1-->
                <div style="background-color: white; border: 1px solid black; padding: 20px; width: 600px; margin: 0 auto;">
                <div style="margin-top: 50px;">
                <p style="text-align: center; font-family:inlove; font-size: 50px; color: black;">Hola! ${nombreCliente} </p>
                <p style="text-align: justify; font-size: 18px;">¡Gracias por elegir <b>Create Shop!</b> Tu compra en nuestra tienda virtual significa mucho para nosotros. Esperamos que disfrutes de tus productos tanto como nosotros disfrutamos ofrecértelos.</p>
                <div style="text-align: center;"><img src="https://i.pinimg.com/564x/18/b8/be/18b8beb6b354a19fdb52a25143ccffa8.jpg" style="width: auto; height: 400px;"></div>
                </div>
                </div>
            </div>

            <!--Cuadro 2: Dirección del cliente-->
            <br>
            <br>
            
            <div style="text-align: center; font-size: 80px; color: white;"><h1 style="color: white; font-size: 50px;">CREATE SHOP</h1></div>

            <div style="justify-content: center; align-items: center;  height: 40vh;">
                <div>
                <!--Cuadro 2-->
                    <div style="background-color: white; display: flex; justify-content: center; align-items: center; border: 1px solid black; padding: 20px; width: 600px; margin: 0 auto;">
                        <div>
                            <img src="https://i.pinimg.com/564x/27/17/2c/27172ce1a415f962a6195fc0f3e82772.jpg" style="width: 150px; height: auto; ">
                        </div>
                        <div>
                            <b><p style="text-align: center; font-size: 20px;">Dirección de entrega del pedido</p></b>
                            <p style="text-align: justify; font-size: 18px; margin-left: 20px;">Esta es la dirección que usted proporcionó para la entrega de la compra.</p>
                            <p style="text-align: justify; margin-left: 20px; font-weight: bold; color: rgb(25, 43, 134); font-size: 20px;">${address}</p>
                        </div>
                    </div> 
                </div>
            </div>

            
            <!--Tabla de productos-->
            <div style="background-color: white; justify-content: center;">
                <b><p style="text-align: center; font-size: 20px;">A continuación, le presentamos un resumen de su pedido.</p></b>
                <br>
                    <h1 style="text-align: center; background-color: rgb(192, 240, 224);">Resumen del pedido</h1>
                </b>
            <table class="table-hover" style="text-align: center; border-collapse: collapse; width: 100%;">
                <thead>
                    <tr style="font-size: 17px;">
                        <th scope="col">Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th> 
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${productsTableHTML}
                </tbody>
            </table>
            <a style="font-size: 20px;"><b>Valor total: </b> ${valorTotal}</a>
            </div>
            <div>
                <b><h1 style="text-align: center; font-size: 40px; color: rgb(177, 177, 177); margin-top: 10%;" >GRACIAS POR SU COMPRA</h1></b>
            </div>
            



            </div>
        `;



        // Llamada a la función para enviar el correo electrónico
        sendEmail(user.email, subjectWithDate, htmlContent);/*sendEmail(body.email, 'Orden pedido', htmlContent); */
        console.log('envio correctamente');

    } catch (error) {
        console.log('error al enviar correo', error);
    }
};

const sendEmail = async (to, subject, htmlBody) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'codepruebasprog@gmail.com',
            pass: 'eljkzwbnkxiujnix',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'codepruebasprog@gmail.com',
        to: to,
        subject: subject,
        html: htmlBody
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado: ' + info.response);
    } catch (error) {
        console.error('Error al enviar email: ', error);
    }
};