'use strict';

var http = require('http');
var base64url = require('base64url');
var crypto = require('crypto');
var fastXmlParser = require('fast-xml-parser');
var axios = require('axios');
var Decimal = require('decimal.js');
var dayjs = require('dayjs');
var timezone = require('dayjs/plugin/timezone');
var utc = require('dayjs/plugin/utc');

const ALL_ERRORS = [
    { code: 9001, sisCode: 'SIS0001', text: 'Error Interno' },
    { code: 9002, sisCode: 'SIS0002', text: 'Error genérico' },
    { code: 9003, sisCode: 'SIS0003', text: 'Error genérico' },
    { code: 9004, sisCode: 'SIS0004', text: 'Error genérico' },
    { code: 9005, sisCode: 'SIS0005', text: 'Error genérico' },
    { code: 9006, sisCode: 'SIS0006', text: 'Error genérico' },
    {
        code: 9007,
        sisCode: 'SIS0007',
        text: 'El mensaje de petición no es correcto, debe revisar el formato'
    },
    { code: 9008, sisCode: 'SIS0008', text: 'falta Ds_Merchant_MerchantCode' },
    {
        code: 9009,
        sisCode: 'SIS0009',
        text: 'Error de formato en Ds_Merchant_MerchantCode'
    },
    { code: 9010, sisCode: 'SIS0010', text: 'Error falta Ds_Merchant_Terminal' },
    {
        code: 9011,
        sisCode: 'SIS0011',
        text: 'Error de formato en Ds_Merchant_Terminal'
    },
    { code: 9012, sisCode: 'SIS0012', text: 'Error genérico' },
    { code: 9013, sisCode: 'SIS0013', text: 'Error genérico' },
    {
        code: 9014,
        sisCode: 'SIS0014',
        text: 'Error de formato en Ds_Merchant_Order'
    },
    { code: 9015, sisCode: 'SIS0015', text: 'Error falta Ds_Merchant_Currency' },
    {
        code: 9016,
        sisCode: 'SIS0016',
        text: 'Error de formato en Ds_Merchant_Currency'
    },
    { code: 9018, sisCode: 'SIS0018', text: 'Falta Ds_Merchant_Amount' },
    {
        code: 9019,
        sisCode: 'SIS0019',
        text: 'Error de formato en Ds_Merchant_Amount'
    },
    {
        code: 9020,
        sisCode: 'SIS0020',
        text: 'Falta Ds_Merchant_MerchantSignature'
    },
    {
        code: 9021,
        sisCode: 'SIS0021',
        text: 'La Ds_Merchant_MerchantSignature viene vacía'
    },
    {
        code: 9022,
        sisCode: 'SIS0022',
        text: 'Error de formato en Ds_Merchant_TransactionType'
    },
    {
        code: 9023,
        sisCode: 'SIS0023',
        text: 'Ds_Merchant_TransactionType desconocido'
    },
    {
        code: 9024,
        sisCode: 'SIS0024',
        text: 'El Ds_Merchant_ConsumerLanguage tiene mas de 3 posiciones'
    },
    {
        code: 9025,
        sisCode: 'SIS0025',
        text: 'Error de formato en Ds_Merchant_ConsumerLanguage'
    },
    { code: 9026, sisCode: 'SIS0026', text: 'Problema con la configuración' },
    {
        code: 9027,
        sisCode: 'SIS0027',
        text: 'Revisar la moneda que está enviando'
    },
    {
        code: 9028,
        sisCode: 'SIS0028',
        text: 'Error Comercio / terminal está dado de baja'
    },
    {
        code: 9029,
        sisCode: 'SIS0029',
        text: 'Que revise como está montando el mensaje'
    },
    {
        code: 9030,
        sisCode: 'SIS0030',
        text: 'Nos llega un tipo de operación errónea'
    },
    {
        code: 9031,
        sisCode: 'SIS0031',
        text: 'Nos está llegando un método de pago erróneo'
    },
    {
        code: 9032,
        sisCode: 'SIS0032',
        text: 'Revisar como está montando el mensaje para la devolución.'
    },
    { code: 9033, sisCode: 'SIS0033', text: 'El tipo de operación es erróneo' },
    { code: 9034, sisCode: 'SIS0034', text: 'error interno' },
    {
        code: 9035,
        sisCode: 'SIS0035',
        text: 'Error interno al recuperar datos de sesión'
    },
    {
        code: 9037,
        sisCode: 'SIS0037',
        text: 'El número de teléfono no es válido'
    },
    { code: 9038, sisCode: 'SIS0038', text: 'Error genérico' },
    { code: 9039, sisCode: 'SIS0039', text: 'Error genérico' },
    {
        code: 9040,
        sisCode: 'SIS0040',
        text: 'El comercio tiene un error en la configuración, tienen que hablar con su entidad.'
    },
    { code: 9041, sisCode: 'SIS0041', text: 'Error en el cálculo de la firma' },
    { code: 9042, sisCode: 'SIS0042', text: 'Error en el cálculo de la firma' },
    { code: 9043, sisCode: 'SIS0043', text: 'Error genérico' },
    { code: 9044, sisCode: 'SIS0044', text: 'Error genérico' },
    {
        code: 9046,
        sisCode: 'SIS0046',
        text: 'Problema con la configuración del bin de la tarjeta'
    },
    { code: 9047, sisCode: 'SIS0047', text: 'Error genérico' },
    { code: 9048, sisCode: 'SIS0048', text: 'Error genérico' },
    { code: 9049, sisCode: 'SIS0049', text: 'Error genérico' },
    { code: 9050, sisCode: 'SIS0050', text: 'Error genérico' },
    { code: 9051, sisCode: 'SIS0051', text: 'Error número de pedido repetido' },
    { code: 9052, sisCode: 'SIS0052', text: 'Error genérico' },
    { code: 9053, sisCode: 'SIS0053', text: 'Error genérico' },
    {
        code: 9054,
        sisCode: 'SIS0054',
        text: 'No existe operación sobre la que realizar la devolución'
    },
    {
        code: 9055,
        sisCode: 'SIS0055',
        text: 'existe más de un pago con el mismo número de pedido'
    },
    {
        code: 9056,
        sisCode: 'SIS0056',
        text: 'Revisar el estado de la autorización'
    },
    {
        code: 9057,
        sisCode: 'SIS0057',
        text: 'Que revise el importe que quiere devolver( supera el permitido)'
    },
    {
        code: 9058,
        sisCode: 'SIS0058',
        text: 'Que revise los datos con los que está validando la confirmación'
    },
    { code: 9059, sisCode: 'SIS0059', text: 'Revisar que existe esa operación' },
    {
        code: 9060,
        sisCode: 'SIS0060',
        text: 'Revisar que exista la confirmación'
    },
    {
        code: 9061,
        sisCode: 'SIS0061',
        text: 'Revisar el estado de la preautorización'
    },
    {
        code: 9062,
        sisCode: 'SIS0062',
        text: 'Que el comercio revise el importe a confirmar.'
    },
    {
        code: 9063,
        sisCode: 'SIS0063',
        text: 'Que el comercio revise el númer de tarjeta que nos están enviando.'
    },
    {
        code: 9064,
        sisCode: 'SIS0064',
        text: 'Número de posiciones de la tarjeta incorrecto'
    },
    {
        code: 9065,
        sisCode: 'SIS0065',
        text: 'El número de tarjeta no es numérico'
    },
    { code: 9066, sisCode: 'SIS0066', text: 'Error mes de caducidad' },
    {
        code: 9067,
        sisCode: 'SIS0067',
        text: 'El mes de la caducidad no es numérico'
    },
    {
        code: 9068,
        sisCode: 'SIS0068',
        text: 'El mes de la caducidad no es válido'
    },
    { code: 9069, sisCode: 'SIS0069', text: 'Año de caducidad no valido' },
    {
        code: 9070,
        sisCode: 'SIS0070',
        text: 'El Año de la caducidad no es numérico'
    },
    { code: 9071, sisCode: 'SIS0071', text: 'Tarjeta caducada' },
    { code: 9072, sisCode: 'SIS0072', text: 'Operación no anulable' },
    { code: 9073, sisCode: 'SIS0073', text: 'Error en la anulación' },
    {
        code: 9074,
        sisCode: 'SIS0074',
        text: 'Falta Ds_Merchant_Order ( Pedido )'
    },
    {
        code: 9075,
        sisCode: 'SIS0075',
        text: 'El comercio tiene que revisar cómo está enviando el número de pedido'
    },
    {
        code: 9076,
        sisCode: 'SIS0076',
        text: 'El comercio tiene que revisar el número de pedido'
    },
    {
        code: 9077,
        sisCode: 'SIS0077',
        text: 'El comercio tiene que revisar el número de pedido'
    },
    {
        code: 9078,
        sisCode: 'SIS0078',
        text: 'Por la configuración de los métodos de pago de su comercio no se permiten los pagos con esa tarjeta.'
    },
    { code: 9079, sisCode: 'SIS0079', text: 'Error genérico' },
    { code: 9080, sisCode: 'SIS0080', text: 'Error genérico' },
    {
        code: 9081,
        sisCode: 'SIS0081',
        text: 'Se ha perdico los datos de la sesión'
    },
    { code: 9082, sisCode: 'SIS0082', text: 'Error genérico' },
    { code: 9083, sisCode: 'SIS0083', text: 'Error genérico' },
    {
        code: 9088,
        sisCode: 'SIS0088',
        text: 'El comercio tiene que revisar el valor que envía en ese campo'
    },
    {
        code: 9089,
        sisCode: 'SIS0089',
        text: 'El valor de caducidad no ocupa 4 posiciones'
    },
    {
        code: 9092,
        sisCode: 'SIS0092',
        text: 'Se ha introducido una caducidad incorrecta.'
    },
    { code: 9093, sisCode: 'SIS0093', text: 'Denegación emisor' },
    { code: 9094, sisCode: 'SIS0094', text: 'Denegación emisor' },
    { code: 9095, sisCode: 'SIS0095', text: 'Denegación emisor' },
    {
        code: 9099,
        sisCode: 'SIS0099',
        text: 'Error al interpretar respuesta de autenticación'
    },
    {
        code: 9103,
        sisCode: 'SIS0103',
        text: 'Error al montar la petición de Autenticación'
    },
    {
        code: 9112,
        sisCode: 'SIS0112',
        text: 'Que revise que está enviando en el campo Ds_Merchant_Transacction_Type.'
    },
    { code: 9113, sisCode: 'SIS0113', text: 'Error interno' },
    {
        code: 9114,
        sisCode: 'SIS0114',
        text: 'Se está realizando la llamada por GET, la tiene que realizar por POST'
    },
    {
        code: 9115,
        sisCode: 'SIS0115',
        text: 'Que revise los datos de la operación que nos está enviando'
    },
    {
        code: 9116,
        sisCode: 'SIS0116',
        text: 'La operación sobre la que se desea pagar una cuota no es una operación válida'
    },
    {
        code: 9117,
        sisCode: 'SIS0117',
        text: 'La operación sobre la que se desea pagar una cuota no está autorizada'
    },
    {
        code: 9118,
        sisCode: 'SIS0118',
        text: 'Se ha excedido el importe total de las cuotas'
    },
    {
        code: 9119,
        sisCode: 'SIS0119',
        text: 'Valor del campo Ds_Merchant_DateFrecuency no válido ( Pagos recurrentes)'
    },
    {
        code: 9120,
        sisCode: 'SIS0120',
        text: 'Valor del campo Ds_Merchant_ChargeExpiryDate no válido'
    },
    {
        code: 9121,
        sisCode: 'SIS0121',
        text: 'Valor del campo Ds_Merchant_SumTotal no válido'
    },
    {
        code: 9122,
        sisCode: 'SIS0122',
        text: 'Formato incorrecto del campo Ds_Merchant_DateFrecuency o Ds_Merchant_SumTotal'
    },
    {
        code: 9123,
        sisCode: 'SIS0123',
        text: 'Se ha excedido la fecha tope para realiza la Transacción'
    },
    {
        code: 9124,
        sisCode: 'SIS0124',
        text: 'No ha transcurrido la frecuencia mínima en un pago recurrente sucesivo'
    },
    { code: 9125, sisCode: 'SIS0125', text: 'Error genérico' },
    { code: 9126, sisCode: 'SIS0126', text: 'Operación Duplicada' },
    { code: 9127, sisCode: 'SIS0127', text: 'Error Interno' },
    { code: 9128, sisCode: 'SIS0128', text: 'Error interno' },
    { code: 9130, sisCode: 'SIS0130', text: 'Error Interno' },
    { code: 9131, sisCode: 'SIS0131', text: 'Error Interno' },
    {
        code: 9132,
        sisCode: 'SIS0132',
        text: 'La fecha de Confirmación de Autorización no puede superar en mas de 7 dias a la de Preautorización.'
    },
    {
        code: 9133,
        sisCode: 'SIS0133',
        text: 'La fecha de Confirmación de Autenticación no puede superar en mas de 45 días a la de Autenticacion Previa que el comercio revise la fecha de la Preautenticación'
    },
    {
        code: 9139,
        sisCode: 'SIS0139',
        text: 'pago recurrente inicial está duplicado'
    },
    { code: 9140, sisCode: 'SIS0140', text: 'Error Interno' },
    { code: 9142, sisCode: 'SIS0142', text: 'Tiempo excecido para el pago' },
    { code: 9151, sisCode: 'SIS0151', text: 'Error Interno' },
    {
        code: 9169,
        sisCode: 'SIS0169',
        text: 'El valor del campo Ds_Merchant_MatchingData ( Datos de Case) no es valido , que lo revise'
    },
    {
        code: 9170,
        sisCode: 'SIS0170',
        text: 'Que revise el adquirente que manda en el campo'
    },
    {
        code: 9171,
        sisCode: 'SIS0171',
        text: 'Que revise el CSB que nos está enviando'
    },
    {
        code: 9172,
        sisCode: 'SIS0172',
        text: 'El valor del campo PUCE Ds_Merchant_MerchantCode no es válido'
    },
    {
        code: 9173,
        sisCode: 'SIS0173',
        text: 'Que el comercio revise el campo de la URL OK'
    },
    { code: 9174, sisCode: 'SIS0174', text: 'Error Interno' },
    { code: 9175, sisCode: 'SIS0175', text: 'Error Interno' },
    { code: 9181, sisCode: 'SIS0181', text: 'Error Interno' },
    { code: 9182, sisCode: 'SIS0182', text: 'Error Interno' },
    { code: 9183, sisCode: 'SIS0183', text: 'Error interno' },
    { code: 9184, sisCode: 'SIS0184', text: 'Error interno' },
    { code: 9187, sisCode: 'SIS0187', text: 'Error formato( Interno )' },
    {
        code: 9197,
        sisCode: 'SIS0197',
        text: 'Error al obtener los datos de cesta de la compra'
    },
    {
        code: 9214,
        sisCode: 'SIS0214',
        text: 'Su comercion no permite devoluciones por el tipo de firma ( Completo)'
    },
    { code: 9216, sisCode: 'SIS0216', text: 'El CVV2 tiene mas de 3 posiciones' },
    { code: 9217, sisCode: 'SIS0217', text: 'Error de formato en el CVV2' },
    {
        code: 9218,
        sisCode: 'SIS0218',
        text: 'El comercio no permite operaciones seguras por las entradas "operaciones" o "WebService"'
    },
    {
        code: 9219,
        sisCode: 'SIS0219',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9220,
        sisCode: 'SIS0220',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9221,
        sisCode: 'SIS0221',
        text: 'El cliente no está introduciendo el CVV2'
    },
    {
        code: 9222,
        sisCode: 'SIS0222',
        text: 'Existe una anulación asociada a la preautorización'
    },
    {
        code: 9223,
        sisCode: 'SIS0223',
        text: 'La preautorización que se desea anular no está autorizada'
    },
    {
        code: 9224,
        sisCode: 'SIS0224',
        text: 'Su comercio no permite anulaciones por no tener la firma ampliada'
    },
    {
        code: 9225,
        sisCode: 'SIS0225',
        text: 'No existe operación sobre la que realizar la anulación'
    },
    {
        code: 9226,
        sisCode: 'SIS0226',
        text: 'Error en en los datos de la anulación manual'
    },
    {
        code: 9227,
        sisCode: 'SIS0227',
        text: 'Que el comercio revise el campo Ds_Merchant_TransactionDate'
    },
    {
        code: 9228,
        sisCode: 'SIS0228',
        text: 'El tipo de tarjeta no puede realizar pago aplazado'
    },
    {
        code: 9229,
        sisCode: 'SIS0229',
        text: 'Error con el codigo de aplazamiento'
    },
    {
        code: 9230,
        sisCode: 'SIS0230',
        text: 'Su comercio no permite pago fraccionado( Consulte a su entidad)'
    },
    {
        code: 9231,
        sisCode: 'SIS0231',
        text: 'No hay forma de pago aplicable ( Consulte con su entidad)'
    },
    { code: 9232, sisCode: 'SIS0232', text: 'Forma de pago no disponible' },
    { code: 9233, sisCode: 'SIS0233', text: 'Forma de pago desconocida' },
    {
        code: 9234,
        sisCode: 'SIS0234',
        text: 'Nombre del titular de la cuenta no disponible'
    },
    {
        code: 9235,
        sisCode: 'SIS0235',
        text: 'Campo Sis_Numero_Entidad no disponible'
    },
    {
        code: 9236,
        sisCode: 'SIS0236',
        text: 'El campo Sis_Numero_Entidad no tiene la longitud requerida'
    },
    {
        code: 9237,
        sisCode: 'SIS0237',
        text: 'El campo Sis_Numero_Entidad no es numérico'
    },
    {
        code: 9238,
        sisCode: 'SIS0238',
        text: 'Campo Sis_Numero_Oficina no disponible'
    },
    {
        code: 9239,
        sisCode: 'SIS0239',
        text: 'El campo Sis_Numero_Oficina no tiene la longitud requerida'
    },
    {
        code: 9240,
        sisCode: 'SIS0240',
        text: 'El campo Sis_Numero_Oficina no es numérico'
    },
    { code: 9241, sisCode: 'SIS0241', text: 'Campo Sis_Numero_DC no disponible' },
    {
        code: 9242,
        sisCode: 'SIS0242',
        text: 'El campo Sis_Numero_DC no tiene la longitud requerida'
    },
    {
        code: 9243,
        sisCode: 'SIS0243',
        text: 'El campo Sis_Numero_DC no es numérico'
    },
    {
        code: 9244,
        sisCode: 'SIS0244',
        text: 'Campo Sis_Numero_Cuenta no disponible'
    },
    {
        code: 9245,
        sisCode: 'SIS0245',
        text: 'El campo Sis_Numero_Cuenta no tiene la longitud requerida'
    },
    {
        code: 9246,
        sisCode: 'SIS0246',
        text: 'El campo Sis_Numero_Cuenta no es numérico'
    },
    {
        code: 9247,
        sisCode: 'SIS0247',
        text: 'Dígito de Control de Cuenta Cliente no válido'
    },
    {
        code: 9248,
        sisCode: 'SIS0248',
        text: 'El comercio no permite pago por domiciliación'
    },
    { code: 9249, sisCode: 'SIS0249', text: 'Error genérico' },
    { code: 9250, sisCode: 'SIS0250', text: 'Error genérico' },
    {
        code: 9251,
        sisCode: 'SIS0251',
        text: 'No permite transferencias( Consultar con entidad )'
    },
    {
        code: 9252,
        sisCode: 'SIS0252',
        text: 'Por su configuración no puede enviar la tarjeta. ( Para modificarlo consualtar con la entidad)'
    },
    {
        code: 9253,
        sisCode: 'SIS0253',
        text: 'No se ha tecleado correctamente la tarjeta.'
    },
    {
        code: 9254,
        sisCode: 'SIS0254',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9255,
        sisCode: 'SIS0255',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9257,
        sisCode: 'SIS0257',
        text: 'La tarjeta no permite operativa de preautorizacion'
    },
    {
        code: 9258,
        sisCode: 'SIS0258',
        text: 'Tienen que revisar los datos de la validación'
    },
    {
        code: 9259,
        sisCode: 'SIS0259',
        text: 'No existe la operacion original para notificar o consultar'
    },
    { code: 9260, sisCode: 'SIS0260', text: 'Entrada incorrecta al SIS' },
    {
        code: 9261,
        sisCode: 'SIS0261',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9280,
        sisCode: 'SIS0280',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9281,
        sisCode: 'SIS0281',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9282,
        sisCode: 'SIS0282',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: null,
        sisCode: 'SIS0283',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9284,
        sisCode: 'SIS0284',
        text: 'No existe operacion sobre la que realizar el Pago Adicional'
    },
    {
        code: 9285,
        sisCode: 'SIS0285',
        text: 'Tiene más de una operacion sobre la que realizar el Pago Adicional'
    },
    {
        code: 9286,
        sisCode: 'SIS0286',
        text: 'La operación sobre la que se quiere hacer la operación adicional no esta Aceptada'
    },
    {
        code: 9287,
        sisCode: 'SIS0287',
        text: 'la Operacion ha sobrepasado el importe para el Pago Adicional.'
    },
    {
        code: 9288,
        sisCode: 'SIS0288',
        text: 'No se puede realizar otro pago Adicional. se ha superado el numero de pagos'
    },
    {
        code: 9289,
        sisCode: 'SIS0289',
        text: 'El importe del pago Adicional supera el maximo días permitido.'
    },
    {
        code: 9290,
        sisCode: 'SIS0290',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9291,
        sisCode: 'SIS0291',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9292,
        sisCode: 'SIS0292',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9293,
        sisCode: 'SIS0293',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9295,
        sisCode: 'SIS0295',
        text: 'duplicidad de operación. Se puede intentar de nuevo ( 1 minuto )'
    },
    {
        code: 9296,
        sisCode: 'SIS0296',
        text: 'No se encuentra la operación Tarjeta en Archivo inicial'
    },
    {
        code: 9297,
        sisCode: 'SIS0297',
        text: 'Número de operaciones sucesivas de Tarjeta en Archivo superado'
    },
    {
        code: 9298,
        sisCode: 'SIS0298',
        text: 'No puede realizar este tipo de operativa. (Contacte con su entidad)'
    },
    { code: 9299, sisCode: 'SIS0299', text: 'Error en pago con PayPal' },
    { code: 9300, sisCode: 'SIS0300', text: 'Error en pago con PayPal' },
    { code: 9301, sisCode: 'SIS0301', text: 'Error en pago con PayPal' },
    {
        code: 9302,
        sisCode: 'SIS0302',
        text: 'Moneda no válida para pago con PayPal'
    },
    {
        code: 9304,
        sisCode: 'SIS0304',
        text: 'No se permite pago fraccionado si la tarjeta no es de FINCONSUM'
    },
    { code: 9305, sisCode: 'SIS0305', text: 'Revisar la moneda de la operación' },
    {
        code: 9306,
        sisCode: 'SIS0306',
        text: 'Valor de Ds_Merchant_PrepaidCard no válido'
    },
    {
        code: 9307,
        sisCode: 'SIS0307',
        text: 'Que consulye con su entidad. Operativa de tarjeta regalo no permitida'
    },
    {
        code: 9308,
        sisCode: 'SIS0308',
        text: 'Tiempo límite para recarga de tarjeta regalo superado'
    },
    {
        code: 9309,
        sisCode: 'SIS0309',
        text: 'Faltan datos adicionales para realizar la recarga de tarjeta prepago'
    },
    {
        code: 9310,
        sisCode: 'SIS0310',
        text: 'Valor de Ds_Merchant_Prepaid_Expiry no válido'
    },
    { code: 9311, sisCode: 'SIS0311', text: 'Error genérico' },
    {
        code: 9319,
        sisCode: 'SIS0319',
        text: 'El comercio no pertenece al grupo especificado en Ds_Merchant_Group'
    },
    { code: 9320, sisCode: 'SIS0320', text: 'Error generando la referencia' },
    {
        code: 9321,
        sisCode: 'SIS0321',
        text: 'El identificador no está asociado al comercio'
    },
    { code: 9322, sisCode: 'SIS0322', text: 'Que revise el formato del grupo' },
    {
        code: 9323,
        sisCode: 'SIS0323',
        text: 'Para el tipo de operación F( pago en dos fases) es necesario enviar uno de estos campos. Ds_Merchant_Customer_Mobile o Ds_Merchant_Customer_Mail'
    },
    {
        code: 9324,
        sisCode: 'SIS0324',
        text: 'Imposible enviar el link al cliente( Que revise la dirección mail)'
    },
    {
        code: 9326,
        sisCode: 'SIS0326',
        text: 'Se han enviado datos de tarjeta en fase primera de un pago con dos fases'
    },
    {
        code: 9327,
        sisCode: 'SIS0327',
        text: 'No se ha enviado ni móvil ni email en fase primera de un pago con dos fases'
    },
    {
        code: 9328,
        sisCode: 'SIS0328',
        text: 'Token de pago en dos fases inválido'
    },
    {
        code: 9329,
        sisCode: 'SIS0329',
        text: 'No se puede recuperar el Token de pago en dos fases.'
    },
    {
        code: 9330,
        sisCode: 'SIS0330',
        text: 'Fechas incorrectas de pago dos fases'
    },
    {
        code: 9331,
        sisCode: 'SIS0331',
        text: 'La operación no tiene un estado válido o no existe.'
    },
    {
        code: 9332,
        sisCode: 'SIS0332',
        text: 'El importe de la operación original y de la devolución debe ser idéntico'
    },
    {
        code: null,
        sisCode: 'SIS0333',
        text: 'Error en una petición a MasterPass Wallet'
    },
    {
        code: 9283,
        sisCode: 'SIS0334',
        text: 'Se tiene que dirigir a su entidad.'
    },
    {
        code: 9334,
        sisCode: 'SIS0334',
        text: 'Se tiene que dirigir a su entidad.'
    },
    { code: 9335, sisCode: 'SIS0335', text: 'Que revise el valor que envía' },
    { code: 9336, sisCode: 'SIS0336', text: 'Error genérico' },
    { code: 9337, sisCode: 'SIS0337', text: 'Error interno (iUPAY)' },
    {
        code: 9338,
        sisCode: 'SIS0338',
        text: 'No se encuentra la operación iUPAY'
    },
    {
        code: 9339,
        sisCode: 'SIS0339',
        text: 'El comercio no dispone de pago iUPAY ( Consulte a su entidad)'
    },
    {
        code: 9340,
        sisCode: 'SIS0340',
        text: 'Respuesta recibida desde iUPAY no válida'
    },
    { code: 9341, sisCode: 'SIS0341', text: 'Error interno (iUPAY)' },
    {
        code: 9344,
        sisCode: 'SIS0344',
        text: 'El usuario ha elegido aplazar el pago, pero no ha aceptado las condiciones de las cuotas'
    },
    {
        code: 9345,
        sisCode: 'SIS0345',
        text: 'Revisar el número de plazos que está enviando.'
    },
    {
        code: 9346,
        sisCode: 'SIS0346',
        text: 'Revisar formato en parámetro DS_MERCHANT_PAY_TYPE'
    },
    {
        code: 9347,
        sisCode: 'SIS0347',
        text: 'El comercio no está configurado para realizar la consulta de BIN.'
    },
    {
        code: 9348,
        sisCode: 'SIS0348',
        text: 'El BIN indicado en la consulta no se reconoce'
    },
    {
        code: 9349,
        sisCode: 'SIS0349',
        text: 'Los datos de importe y DCC enviados no coinciden con los registrados en SIS'
    },
    {
        code: 9350,
        sisCode: 'SIS0350',
        text: 'No hay datos DCC registrados en SIS para este número de pedido'
    },
    { code: 9351, sisCode: 'SIS0351', text: 'Autenticación prepago incorrecta' },
    {
        code: 9352,
        sisCode: 'SIS0352',
        text: 'El tipo de firma no permite esta operativa'
    },
    { code: 9353, sisCode: 'SIS0353', text: 'Clave no válida' },
    { code: 9354, sisCode: 'SIS0354', text: 'Error descifrando petición al SIS' },
    {
        code: 9355,
        sisCode: 'SIS0355',
        text: 'El comercio-terminal enviado en los datos cifrados no coincide con el enviado en la petición'
    },
    {
        code: 9356,
        sisCode: 'SIS0356',
        text: 'El comercio no tiene activo control de fraude ( Consulte con su entidad'
    },
    {
        code: 9357,
        sisCode: 'SIS0357',
        text: 'El comercio tiene activo control de fraude y no existe campo ds_merchant_merchantscf'
    },
    { code: 9358, sisCode: 'SIS0358', text: 'No dispone de pago iUPAY' },
    {
        code: 9370,
        sisCode: 'SIS0370',
        text: 'Error en formato Scf_Merchant_Nif. Longitud máxima 16'
    },
    {
        code: 9371,
        sisCode: 'SIS0371',
        text: 'Error en formato Scf_Merchant_Name. Longitud máxima 30'
    },
    {
        code: 9372,
        sisCode: 'SIS0372',
        text: 'Error en formato Scf_Merchant_First_Name. Longitud máxima 30'
    },
    {
        code: 9373,
        sisCode: 'SIS0373',
        text: 'Error en formato Scf_Merchant_Last_Name. Longitud máxima 30'
    },
    {
        code: 9374,
        sisCode: 'SIS0374',
        text: 'Error en formato Scf_Merchant_User. Longitud máxima 45'
    },
    {
        code: 9375,
        sisCode: 'SIS0375',
        text: 'Error en formato Scf_Affinity_Card. Valores posibles "S" o "N". Longitud máxima 1'
    },
    {
        code: 9376,
        sisCode: 'SIS0376',
        text: 'Error en formato Scf_Payment_Financed. Valores posibles "S" o "N". Longitud máxima 1'
    },
    {
        code: 9377,
        sisCode: 'SIS0377',
        text: 'Error en formato Scf_Ticket_Departure_Point. Longitud máxima 30'
    },
    {
        code: 9378,
        sisCode: 'SIS0378',
        text: 'Error en formato Scf_Ticket_Destination. Longitud máxima 30'
    },
    {
        code: 9379,
        sisCode: 'SIS0379',
        text: 'Error en formato Scf_Ticket_Departure_Date. Debe tener formato yyyyMMddHHmmss.'
    },
    {
        code: 9380,
        sisCode: 'SIS0380',
        text: 'Error en formato Scf_Ticket_Num_Passengers. Longitud máxima 1.'
    },
    {
        code: 9381,
        sisCode: 'SIS0381',
        text: 'Error en formato Scf_Passenger_Dni. Longitud máxima 16.'
    },
    {
        code: 9382,
        sisCode: 'SIS0382',
        text: 'Error en formato Scf_Passenger_Name. Longitud máxima 30.'
    },
    {
        code: 9383,
        sisCode: 'SIS0383',
        text: 'Error en formato Scf_Passenger_First_Name. Longitud máxima 30.'
    },
    {
        code: 9384,
        sisCode: 'SIS0384',
        text: 'Error en formato Scf_Passenger_Last_Name. Longitud máxima 30.'
    },
    {
        code: 9385,
        sisCode: 'SIS0385',
        text: 'Error en formato Scf_Passenger_Check_Luggage. Valores posibles "S" o "N". Longitud máxima 1.'
    },
    {
        code: 9386,
        sisCode: 'SIS0386',
        text: 'Error en formato Scf_Passenger_Special_luggage. Valores posibles "S" o "N". Longitud máxima 1.'
    },
    {
        code: 9387,
        sisCode: 'SIS0387',
        text: 'Error en formato Scf_Passenger_Insurance_Trip. Valores posibles "S" o "N". Longitud máxima 1.'
    },
    {
        code: 9388,
        sisCode: 'SIS0388',
        text: 'Error en formato Scf_Passenger_Type_Trip. Valores posibles "N" o "I". Longitud máxima 1.'
    },
    {
        code: 9389,
        sisCode: 'SIS0389',
        text: 'Error en formato Scf_Passenger_Pet. Valores posibles "S" o "N". Longitud máxima 1.'
    },
    {
        code: 9390,
        sisCode: 'SIS0390',
        text: 'Error en formato Scf_Order_Channel. Valores posibles "M"(móvil), "P"(PC) o "T"(Tablet)'
    },
    {
        code: 9391,
        sisCode: 'SIS0391',
        text: 'Error en formato Scf_Order_Total_Products. Debe tener formato numérico y longitud máxima de 3.'
    },
    {
        code: 9392,
        sisCode: 'SIS0392',
        text: 'Error en formato Scf_Order_Different_Products. Debe tener formato numérico y longitud máxima de 3.'
    },
    {
        code: 9393,
        sisCode: 'SIS0393',
        text: 'Error en formato Scf_Order_Amount. Debe tener formato numérico y longitud máxima de 19.'
    },
    {
        code: 9394,
        sisCode: 'SIS0394',
        text: 'Error en formato Scf_Order_Max_Amount. Debe tener formato numérico y longitud máxima de 19.'
    },
    {
        code: 9395,
        sisCode: 'SIS0395',
        text: 'Error en formato Scf_Order_Coupon. Valores posibles "S" o "N"'
    },
    {
        code: 9396,
        sisCode: 'SIS0396',
        text: 'Error en formato Scf_Order_Show_Type. Debe longitud máxima de 30.'
    },
    {
        code: 9397,
        sisCode: 'SIS0397',
        text: 'Error en formato Scf_Wallet_Identifier'
    },
    {
        code: 9398,
        sisCode: 'SIS0398',
        text: 'Error en formato Scf_Wallet_Client_Identifier'
    },
    {
        code: 9399,
        sisCode: 'SIS0399',
        text: 'Error en formato Scf_Merchant_Ip_Address'
    },
    {
        code: 9400,
        sisCode: 'SIS0400',
        text: 'Error en formato Scf_Merchant_Proxy'
    },
    {
        code: 9401,
        sisCode: 'SIS0401',
        text: 'Error en formato Ds_Merchant_Mail_Phone_Number. Debe ser numérico y de longitud máxima 19'
    },
    {
        code: 9402,
        sisCode: 'SIS0402',
        text: 'Error en llamada a SafetyPay para solicitar token url'
    },
    {
        code: 9403,
        sisCode: 'SIS0403',
        text: 'Error en proceso de solicitud de token url a SafetyPay'
    },
    { code: 9404, sisCode: 'SIS0404', text: 'Error en una petición a SafetyPay' },
    {
        code: 9405,
        sisCode: 'SIS0405',
        text: 'Solicitud de token url denegada SAFETYPAY'
    },
    {
        code: 9406,
        sisCode: 'SIS0406',
        text: 'Se tiene que poner en contacto con su entidad para que revisen la configuración del sector de actividad de su comercio'
    },
    {
        code: 9407,
        sisCode: 'SIS0407',
        text: 'El importe de la operación supera el máximo permitido para realizar un pago de premio de apuesta(Gambling)'
    },
    {
        code: 9408,
        sisCode: 'SIS0408',
        text: 'La tarjeta debe de haber operado durante el último año para poder realizar un pago de premio de apuesta (Gambling)'
    },
    {
        code: 9409,
        sisCode: 'SIS0409',
        text: 'La tarjeta debe ser una Visa o MasterCard nacional para realizar un pago de premio de apuesta (Gambling)'
    },
    { code: 9410, sisCode: 'SIS0410', text: 'Denegada por el emisor' },
    {
        code: 9411,
        sisCode: 'SIS0411',
        text: 'Error en la configuración del comercio (Remitir a su entidad)'
    },
    { code: 9412, sisCode: 'SIS0412', text: 'La firma no es correcta' },
    {
        code: 9413,
        sisCode: 'SIS0413',
        text: 'Denegada, consulte con su entidad.'
    },
    {
        code: 9415,
        sisCode: 'SIS0415',
        text: 'El tipo de producto no es correcto'
    },
    { code: 9428, sisCode: 'SIS0428', text: 'Operacion debito no segura' },
    {
        code: 9429,
        sisCode: 'SIS0429',
        text: 'Error en la versión enviada por el comercio (Ds_SignatureVersion)'
    },
    {
        code: 9430,
        sisCode: 'SIS0430',
        text: 'Error al decodificar el parámetro Ds_MerchantParameters'
    },
    {
        code: 9431,
        sisCode: 'SIS0431',
        text: 'Error del objeto JSON que se envía codificado en el parámetro Ds_MerchantParameters'
    },
    { code: 9432, sisCode: 'SIS0432', text: 'Error FUC del comercio erróneo' },
    {
        code: 9433,
        sisCode: 'SIS0433',
        text: 'Error Terminal del comercio erróneo'
    },
    {
        code: 9434,
        sisCode: 'SIS0434',
        text: 'Error ausencia de número de pedido en la op. del comercio'
    },
    { code: 9435, sisCode: 'SIS0435', text: 'Error en el cálculo de la firma' },
    {
        code: 9436,
        sisCode: 'SIS0436',
        text: 'Error en la construcción del elemento padre'
    },
    {
        code: 9437,
        sisCode: 'SIS0437',
        text: 'Error en la construcción del elemento'
    },
    {
        code: 9438,
        sisCode: 'SIS0438',
        text: 'Error en la construcción del elemento'
    },
    {
        code: 9439,
        sisCode: 'SIS0439',
        text: 'Error en la construcción del elemento'
    },
    { code: 9440, sisCode: 'SIS0440', text: 'Error genérico' },
    {
        code: 9441,
        sisCode: 'SIS0441',
        text: 'Error no tenemos bancos para Mybank'
    },
    { code: 9442, sisCode: 'SIS0442', text: 'Error genérico' },
    {
        code: 9443,
        sisCode: 'SIS0443',
        text: 'No se permite pago con esta tarjeta'
    },
    {
        code: 9444,
        sisCode: 'SIS0444',
        text: 'Se está intentando acceder usando firmas antiguas y el comercio está configurado como HMAC SHA256'
    },
    { code: 9445, sisCode: 'SIS0445', text: 'Error genérico' },
    {
        code: 9446,
        sisCode: 'SIS0446',
        text: 'Es obligatorio indicar la forma de pago'
    },
    {
        code: 9448,
        sisCode: 'SIS0448',
        text: 'El comercio no tiene el método de pago "Pago DINERS"'
    },
    {
        code: 9449,
        sisCode: 'SIS0449',
        text: 'Tipo de pago de la operación no permitido para este tipo de tarjeta'
    },
    {
        code: 9450,
        sisCode: 'SIS0450',
        text: 'Tipo de pago de la operación no permitido para este tipo de tarjeta'
    },
    {
        code: 9451,
        sisCode: 'SIS0451',
        text: 'Tipo de pago de la operación no permitido para este tipo de tarjeta'
    },
    {
        code: 9453,
        sisCode: 'SIS0453',
        text: 'No se permiten pagos con ese tipo de tarjeta'
    },
    {
        code: 9454,
        sisCode: 'SIS0454',
        text: 'No se permiten pagos con ese tipo de tarjeta'
    },
    {
        code: 9455,
        sisCode: 'SIS0455',
        text: 'No se permiten pagos con ese tipo de tarjeta'
    },
    {
        code: 9456,
        sisCode: 'SIS0456',
        text: 'No tiene método de pago configurado (Consulte a su entidad)'
    },
    {
        code: 9459,
        sisCode: 'SIS0459',
        text: 'No tiene método de pago configurado (Consulte a su entidad)'
    },
    {
        code: 9460,
        sisCode: 'SIS0460',
        text: 'No tiene método de pago configurado (Consulte a su entidad)'
    },
    {
        code: 9461,
        sisCode: 'SIS0461',
        text: 'No tiene método de pago configurado (Consulte a su entidad)'
    },
    {
        code: 9462,
        sisCode: 'SIS0462',
        text: 'Metodo de pago no disponible para conexión HOST to HOST'
    },
    { code: 9463, sisCode: 'SIS0463', text: 'Metodo de pago no permitido' },
    {
        code: 9465,
        sisCode: 'SIS0465',
        text: 'No tiene método de pago configurado (Consulte a su entidad)'
    },
    {
        code: 9466,
        sisCode: 'SIS0466',
        text: 'La referencia que se está utilizando no existe.'
    },
    {
        code: 9467,
        sisCode: 'SIS0467',
        text: 'La referencia que se está utilizando está dada de baja'
    },
    {
        code: 9468,
        sisCode: 'SIS0468',
        text: 'Se está utilizando una referencia que se generó con un adquirente distinto al adquirente que la utiliza.'
    },
    {
        code: 9469,
        sisCode: 'SIS0469',
        text: 'Error, no se ha superado el proceso de fraude MR'
    },
    {
        code: 9470,
        sisCode: 'SIS0470',
        text: 'Error la solicitud del primer factor ha fallado.'
    },
    {
        code: 9471,
        sisCode: 'SIS0471',
        text: 'Error en la URL de redirección de solicitud del primer factor.'
    },
    {
        code: 9472,
        sisCode: 'SIS0472',
        text: 'Error al montar la petición de Autenticación de PPII.'
    },
    {
        code: 9473,
        sisCode: 'SIS0473',
        text: 'Error la respuesta de la petición de Autenticación de PPII es nula.'
    },
    {
        code: 9474,
        sisCode: 'SIS0474',
        text: 'Error el statusCode de la respuesta de la petición de Autenticación de PPII es nulo'
    },
    {
        code: 9475,
        sisCode: 'SIS0475',
        text: 'Error el idOperación de la respuesta de la petición de Autenticación de PPII es nulo'
    },
    {
        code: 9476,
        sisCode: 'SIS0476',
        text: 'Error tratando la respuesta de la Autenticación de PPII'
    },
    {
        code: 9477,
        sisCode: 'SIS0477',
        text: 'Error se ha superado el tiempo definido entre el paso 1 y 2 de PPI'
    },
    {
        code: 9478,
        sisCode: 'SIS0478',
        text: 'Error tratando la respuesta de la Autorización de PPII'
    },
    {
        code: 9479,
        sisCode: 'SIS0479',
        text: 'Error la respuesta de la petición de Autorización de PPII es nula'
    },
    {
        code: 9480,
        sisCode: 'SIS0480',
        text: 'Error el statusCode de la respuesta de la petición de Autorización de PPII es nulo.'
    },
    {
        code: 9481,
        sisCode: 'SIS0481',
        text: 'Error, el comercio no es Payment Facilitator'
    },
    {
        code: 9482,
        sisCode: 'SIS0482',
        text: 'Error el idOperación de la respuesta de una Autorización OK es nulo o no coincide con el idOp. de la Auth.'
    },
    {
        code: 9483,
        sisCode: 'SIS0483',
        text: 'Error la respuesta de la petición de devolución de PPII es nula.'
    },
    {
        code: 9484,
        sisCode: 'SIS0484',
        text: 'Error el statusCode o el idPetición de la respuesta de la petición de Devolución de PPII es nulo.'
    },
    {
        code: 9485,
        sisCode: 'SIS0485',
        text: 'Error producido por la denegación de la devolución.'
    },
    {
        code: 9486,
        sisCode: 'SIS0486',
        text: 'Error la respuesta de la petición de consulta de PPII es nula.'
    },
    {
        code: 9487,
        sisCode: 'SIS0487',
        text: 'El comercio terminal no tiene habilitado el método de pago Paygold.'
    },
    {
        code: 9488,
        sisCode: 'SIS0488',
        text: 'El comercio no tiene el método de pago "Pago MOTO/Manual" y la operación viene marcada como pago MOTO.'
    },
    {
        code: 9489,
        sisCode: 'SIS0489',
        text: 'Error de datos. Operacion MPI Externo no permitida'
    },
    {
        code: 9490,
        sisCode: 'SIS0490',
        text: 'Error de datos. Se reciben parametros MPI Redsys en operacion MPI Externo'
    },
    {
        code: 9491,
        sisCode: 'SIS0491',
        text: 'Error de datos. SecLevel no permitido en operacion MPI Externo'
    },
    {
        code: 9492,
        sisCode: 'SIS0492',
        text: 'Error de datos. Se reciben parametros MPI Externo en operacion MPI Redsys'
    },
    {
        code: 9493,
        sisCode: 'SIS0493',
        text: 'Error de datos. Se reciben parametros de MPI en operacion no segura'
    },
    { code: 9494, sisCode: 'SIS0494', text: 'FIRMA OBSOLETA' },
    { code: 101, sisCode: null, text: 'Tarjeta caducada' },
    { code: 129, sisCode: null, text: 'Código de seguridad CVV incorrecto.' },
    { code: 180, sisCode: null, text: 'Denegación emisor' },
    {
        code: 184,
        sisCode: null,
        text: 'el cliente de la operación no se ha autenticado'
    },
    { code: 190, sisCode: null, text: 'Denegación emisor' },
    {
        code: 904,
        sisCode: null,
        text: 'Problema con la configuración de su comercio. Dirigirse a la entidad.'
    },
    {
        code: 915,
        sisCode: null,
        text: 'El titular ha cancelado la operación de pago.'
    },
    {
        code: 9104,
        sisCode: 'SIS0104',
        text: 'Comercio con "titular seguro" y titular sin clave de compra segura'
    },
    {
        code: 9256,
        sisCode: 'SIS0256',
        text: 'El comercio no permite operativa de preautorizacion'
    },
    { code: 9700, sisCode: 'SIS0700', text: 'PayPal a devuelto un KO' },
    { code: 9801, sisCode: 'SIS0801', text: 'Denegada por iUPAY' },
    {
        code: 9899,
        sisCode: 'SIS0899',
        text: 'No están correctamente firmados los datos que nos envían en el Ds_Merchant_Data.'
    },
    { code: 9900, sisCode: 'SIS0900', text: 'SafetyPay ha devuelto un KO' },
    { code: 9909, sisCode: 'SIS0909', text: 'Error interno' },
    { code: 9912, sisCode: 'SIS0912', text: 'Emisor no disponible' },
    {
        code: 9913,
        sisCode: 'SIS0913',
        text: 'Excepción en el envío SOAP de la notificacion'
    },
    {
        code: 9914,
        sisCode: 'SIS0914',
        text: 'Respuesta KO en el envío SOAP de la notificacion'
    },
    { code: 9915, sisCode: 'SIS0915', text: 'Cancelado por el titular' },
    {
        code: 9928,
        sisCode: 'SIS0928',
        text: 'El titular ha cancelado la preautorización'
    },
    {
        code: 9929,
        sisCode: 'SIS0929',
        text: 'El titular ha cancelado la operación'
    },
    { code: 9930, sisCode: 'SIS0930', text: 'La transferencia está pendiente' },
    { code: 9931, sisCode: 'SIS0931', text: 'Consulte con su entidad' },
    { code: 9932, sisCode: 'SIS0932', text: 'Denegada por Fraude (LINX)' },
    { code: 9933, sisCode: 'SIS0933', text: 'Denegada por Fraude (LINX)' },
    {
        code: 9934,
        sisCode: 'SIS0944',
        text: 'Denegada ( Consulte con su entidad)'
    },
    {
        code: 9935,
        sisCode: 'SIS0935',
        text: 'Denegada ( Consulte con su entidad)'
    },
    { code: 9992, sisCode: 'SIS0992', text: 'Solicitud de PAE' },
    {
        code: 9994,
        sisCode: 'SIS0994',
        text: 'No ha seleccionado ninguna tarjeta de la cartera.'
    },
    { code: 9995, sisCode: 'SIS0995', text: 'Recarga de prepago denegada' },
    {
        code: 9996,
        sisCode: 'SIS0996',
        text: 'No permite la recarga de tarjeta prepago'
    },
    {
        code: 9997,
        sisCode: 'SIS0997',
        text: 'Con una misma tarjeta hay varios pagos en "vuelo" en el momento que se finaliza uno el resto se deniegan con este código. Esta restricción se realiza por seguridad.'
    },
    {
        code: 9998,
        sisCode: 'SIS0998',
        text: 'Operación en proceso de solicitud de datos de tarjeta'
    },
    {
        code: 9999,
        sisCode: 'SIS0999',
        text: 'Operación que ha sido redirigida al emisor a autenticar'
    },
    // Transacciones denegadas por motivos genéricos
    {
        code: 102,
        sisCode: null,
        text: 'Tarjeta bloqueada transitoriamente por el banco emisor o bajo sospecha de fraude.'
    },
    {
        code: 104,
        sisCode: null,
        text: 'Operación no permitida para ese tipo de tarjeta.'
    },
    {
        code: 106,
        sisCode: null,
        text: 'Excedido el número de intentos con PIN erróneo.'
    },
    {
        code: 107,
        sisCode: null,
        text: 'El banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación Manual.'
    },
    {
        code: 109,
        sisCode: null,
        text: 'Denegada porque el comercio no está correctamente dado de alta en los sistemas internacionales de tarjetas.'
    },
    {
        code: 110,
        sisCode: null,
        text: 'El importe de la transacción es inusual para el tipo de comercio que solicita la autorización de pago.'
    },
    {
        code: 114,
        sisCode: null,
        text: 'Operación no permitida para ese tipo de tarjeta.'
    },
    {
        code: 116,
        sisCode: null,
        text: 'El titular no dispone de suficiente crédito.'
    },
    {
        code: 118,
        sisCode: null,
        text: 'Tarjeta inexistente o no dada de alta por banco emisor. (Error SIS0078)'
    },
    {
        code: 119,
        sisCode: null,
        text: 'Transacción denegada por el banco emisor pero sin que este dé detalles acerca del motivo.'
    },
    {
        code: 125,
        sisCode: null,
        text: 'Tarjeta inexistente o no dada de alta por banco emisor.'
    },
    {
        code: 167,
        sisCode: null,
        text: 'Debido a una sospecha de que la transacción es fraudulenta el banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación manual.'
    },
    {
        code: 181,
        sisCode: null,
        text: 'Tarjeta bloqueada transitoriamente por el banco emisor.'
    },
    {
        code: 182,
        sisCode: null,
        text: 'Tarjeta bloqueada transitoriamente por el banco emisor.'
    },
    {
        code: 191,
        sisCode: null,
        text: 'Transacción denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, no se corresponde con la actualmente vigente.'
    },
    // Transacciones denegadas por motivos en los que el banco emisor de la tarjeta considera que existen indicios de fraude.
    {
        code: 201,
        sisCode: null,
        text: 'Transacción denegada porque la fecha de caducidad de la tarjeta que se ha informado en el pago, es anterior a la actualmente vigente. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 202,
        sisCode: null,
        text: 'Tarjeta bloqueada transitoriamente por el banco emisor o bajo sospecha de fraude. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 204,
        sisCode: null,
        text: 'Operación no permitida para ese tipo de tarjeta. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 207,
        sisCode: null,
        text: 'El banco emisor no permite una autorización automática. Es necesario contactar telefónicamente con su centro autorizador para obtener una aprobación manual. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 208,
        sisCode: null,
        text: 'Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 209,
        sisCode: null,
        text: 'Tarjeta bloqueada por el banco emisor debido a que el titular le ha manifestado que le ha sido robada o perdida. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 280,
        sisCode: null,
        text: 'Código exclusivo para transacciones en las que se solicita el código de 3 dígitos CVV2 (tarj.Visa) o CVC2 (tarj.MasterCard) del reverso de la tarjeta. El código CVV2/CVC2 informado por el comprador es erróneo. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    {
        code: 290,
        sisCode: null,
        text: 'Transacción denegada por el banco emisor pero sin que este dé detalles acerca del motivo. Además, el banco emisor considera que la tarjeta está en una situación de posible fraude.'
    },
    // CODIGOS REFERIDOS A ANULACIONES O DEVOLUCIONES
    {
        code: 480,
        sisCode: null,
        text: 'La anulación o retrocesión parcial no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time- out predefinido.'
    },
    {
        code: 481,
        sisCode: null,
        text: 'Transacción de anulación o retrocesión parcial aceptada por el banco emisor. No obstante, la respuesta del banco emisor se ha recibido con mucha demora, fuera del time-out predefinido.'
    },
    // CODIGOS REFERIDOS A CONCILIACIONES DE PRE-AUTORIZACIONES O PRE-AUTENTICACIONES
    {
        code: 500,
        sisCode: null,
        text: 'La transacción de conciliación ha sido aceptada por el banco emisor.'
    },
    {
        code: 501,
        sisCode: null,
        text: 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.'
    },
    {
        code: 502,
        sisCode: null,
        text: 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.'
    },
    {
        code: 503,
        sisCode: null,
        text: 'La conciliación no ha sido aceptada porque no se ha localizado la operación original, o bien, porque el banco emisor no ha dado respuesta dentro del time-out predefinido.'
    },
    // CODIGOS DE ERROR ENVIADOS POR LA PROPIA PLATAFORMA DE PAGOS DE REDSYS
    {
        code: 909,
        sisCode: null,
        text: 'Error en la estabilidad de la plataforma de pagos de RedSys o en la de los sistemas de intercambio de Visa o MasterCard.'
    },
    {
        code: 912,
        sisCode: null,
        text: 'El centro autorizador del banco emisor no está operativo en estos momentos.'
    },
    {
        code: 913,
        sisCode: null,
        text: 'Se ha procesado recientemente una transacción con el mismo número de pedido (Ds_Merchant_Order).'
    },
    { code: 916, sisCode: null, text: 'No es posible operar con este importe.' },
    {
        code: 928,
        sisCode: null,
        text: 'El banco emisor no da respuesta a la petición de autorización dentro del time-out predefinido.'
    },
    {
        code: 940,
        sisCode: null,
        text: 'Se está solicitando una anulación o retrocesión parcial de una transacción que con anterioridad ya fue anulada.'
    },
    {
        code: 941,
        sisCode: null,
        text: 'Se está solicitando la confirmación de una transacción con un número de pedido (Ds_Merchant_Order) que se corresponde a una operación anulada anteriormente.'
    },
    {
        code: 942,
        sisCode: null,
        text: 'Se está solicitando la confirmación de una transacción con un número de pedido (Ds_Merchant_Order) que se corresponde a una operación denegada.'
    },
    {
        code: 943,
        sisCode: null,
        text: 'Se está solicitando una confirmación errónea.'
    },
    {
        code: 944,
        sisCode: null,
        text: 'Se está solicitando la apertura de una tercera sesión. En el proceso de pago solo está permitido tener abiertas dos sesiones (la actual y la anterior pendiente de cierre).'
    },
    {
        code: 945,
        sisCode: null,
        text: 'Se ha procesado recientemente una transacción con el mismo número de pedido (Ds_Merchant_Order).'
    },
    {
        code: 946,
        sisCode: null,
        text: 'Se ha solicitada la anulación o retrocesión parcial de una transacción original que todavía está en proceso y pendiente de respuesta.'
    },
    {
        code: 947,
        sisCode: null,
        text: 'Se está intentando procesar una transacción con el mismo número de pedido (Ds_Merchant_Order) de otra que todavía está pendiente de respuesta.'
    },
    {
        code: 949,
        sisCode: null,
        text: 'El número de comercio (Ds_Merchant_MerchantCode) o el de terminal (Ds_Merchant_Terminal) no están dados de alta o no son operativos.'
    },
    {
        code: 950,
        sisCode: null,
        text: 'La devolución no está permitida por regulación'
    },
    {
        code: 965,
        sisCode: null,
        text: 'Violación de la Normativa de Visa o Mastercard'
    }
];
const ERROR_CODES = {};
const SIS_ERROR_CODES = {};
for (const err of ALL_ERRORS) {
    if (err.code != null && Number.isInteger(err.code)) {
        ERROR_CODES[err.code] = err.text;
    }
    if (err.sisCode != null && err.sisCode) {
        SIS_ERROR_CODES[err.sisCode] = err.text;
    }
}

const RESPONSE_CODES = {
    ...ERROR_CODES,
    // Transacciones exitosas
    0: 'Transacción autorizada por el banco emisor de la tarjeta.',
    1: 'Código exclusivo para transacciones Verified by Visa o MasterCard SecureCode. La transacción ha sido autorizada y, además, el banco emisor nos informa que ha autenticado correctamente la identidad del titular de la tarjeta.',
    2: 'Transacción autorizada por el banco emisor.',
    400: 'Transacción de anulación o retrocesión parcial aceptada por el banco emisor.',
    900: 'Transacción autorizada para devoluciones y confirmaciones.'
};

/**
 * Returns the message corresponding to a response code, in spanish
 *
 * @public
 */
const getResponseCodeMessage = (code) => {
    if (typeof code !== 'number' && typeof code !== 'string') {
        return;
    }
    const lookupNum = typeof code === 'string' ? Number.parseFloat(code.trim()) : code;
    if (!Number.isInteger(lookupNum) || lookupNum < 0) {
        return;
    }
    const msg = RESPONSE_CODES[lookupNum.toString()];
    if ((msg == null || !msg) && lookupNum < 100) {
        return 'Transacción autorizada para pagos y preautorizaciones';
    }
    return msg;
};
/**
 * Returns the message corresponding to a gateway error code
 *
 * @public
 */
const getSISErrorCodeMessage = (code) => {
    if (!code || typeof code !== 'string') {
        return undefined;
    }
    return SIS_ERROR_CODES[code.trim()];
};
const getHTTPErrorCodeMessage = (code) => {
    return http.STATUS_CODES[code];
};

/**
 * Error superclass for all redsys-easy specific errors
 *
 * @public
 */
class RedsysError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RedsysError';
    }
}
/**
 * Invalid input provided
 *
 * @public
 */
class ValidationError extends RedsysError {
    constructor(message, parameters) {
        super(message);
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parameters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RedsysValidationError';
        this.parameters = parameters;
    }
}
/**
 * Response cannot be parsed
 *
 * @public
 */
class ParseError extends RedsysError {
    constructor(message, value, location) {
        super(message);
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "location", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RedsysParseError';
        this.value = value;
        this.location = location;
    }
}
/**
 * HTTP Error
 *
 * @public
 */
class HTTPError extends RedsysError {
    constructor({ message, code, response }) {
        const codeDescription = getHTTPErrorCodeMessage(code);
        const codeInfo = code !== undefined
            ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
            : '';
        const augmentationLine = message != null && message ? `\n${message}` : '';
        const augmentedMessage = `HTTP error${codeInfo}${augmentationLine}`;
        super(augmentedMessage);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RedsysHTTPError';
        this.code = code;
        this.response = response;
    }
}
/**
 * Request could not be processed by Redsys
 *
 * @public
 */
class GatewayError extends RedsysError {
    constructor({ message, code, response }) {
        const codeDescription = getSISErrorCodeMessage(code);
        const codeInfo = code !== undefined
            ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
            : '';
        const augmentationLine = message != null && message ? `\n${message}` : '';
        const augmentedMessage = `Gateway error${codeInfo}${augmentationLine}`;
        super(augmentedMessage);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RedsysGatewayError';
        this.code = code;
        this.response = response;
    }
}
/**
 * Response contained an error code
 *
 * @public
 */
class ResponseError extends RedsysError {
    constructor({ message, code, response }) {
        const codeDescription = getResponseCodeMessage(code);
        const codeInfo = code !== undefined
            ? ` ${code}${codeDescription != null ? `: ${codeDescription}` : ''}`
            : '';
        const augmentationLine = message != null && message ? `\n${message}` : '';
        const augmentedMessage = `Response error${codeInfo}${augmentationLine}`;
        super(augmentedMessage);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'RedsysResponseError';
        this.code = code;
        this.response = response;
    }
}

const deserializeJSONMerchantParams = (strPayload) => {
    if (!strPayload) {
        throw new ParseError('Payload is empty');
    }
    if (typeof strPayload !== 'string') {
        throw new ParseError('Payload must be a base-64 encoded string');
    }
    const payload = JSON.parse(decodeURIComponent(Buffer.from(strPayload, 'base64').toString('utf8')));
    if (typeof payload !== 'object' || payload == null) {
        throw new ParseError('Cannot parse notification payload');
    }
    return payload;
};
const serializeJSONMerchantParams = (requestParams) => {
    // Official redsys docs escape "/" because they use php json_encode. I think
    // this is wrong and it also works without escaping.
    return Buffer.from(JSON.stringify(requestParams), 'utf8').toString('base64');
};

/**
 * Adds padding to a buffer.
 *
 * Rounds up the buffer length to the next block and uses 0 as padding.
 *
 * @params buf - Input buffer
 * @params blocksize - Size of block
 */
const zeroPad = (buf, blocksize) => {
    const pad = Buffer.alloc((blocksize - (buf.length % blocksize)) % blocksize, 0);
    return Buffer.concat([buf, pad]);
};
/**
 * Encrypt a message using 3DES
 *
 * @params key - Key to encrypt message
 * @params message - Message to be encrypted
 */
const encrypt3DES = (key, message) => {
    const keyBuf = Buffer.from(key, 'base64');
    const iv = Buffer.alloc(8, 0);
    const messageBuf = Buffer.from(message.toString(), 'utf8');
    // Align to blocksize by padding the message buffer
    const paddedMessageBuf = zeroPad(messageBuf, 8);
    const cipher = crypto.createCipheriv('des-ede3-cbc', keyBuf, iv);
    cipher.setAutoPadding(false);
    const encryptedBuf = Buffer.concat([
        cipher.update(paddedMessageBuf),
        cipher.final()
    ]);
    // Make sure that encrypted buffer is not longer than the padded message
    const maxLength = Math.ceil(messageBuf.length / 8) * 8;
    return encryptedBuf.slice(0, maxLength);
};
/**
 * Compute HMAC_SHA256_V1 signature
 *
 * @params merchantKey - Key to encrypt message
 * @params order - Order number
 * @params params - Payload to sign
 */
const sha256Sign = (merchantKey, order, params) => {
    const orderKeyBuf = encrypt3DES(merchantKey, order);
    return crypto
        .createHmac('sha256', orderKeyBuf)
        .update(params)
        .digest('base64');
};

/**
 * Discrete uniform distribution with domain (0 to *max*)
 */
const drawPositiveDiscreteUniform = (max) => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % (max + 1);
};
const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
/**
 * Generates a random order ID following redsys requirements
 *
 * @public
 */
const randomTransactionId = () => {
    // Random 4 digit number between 0 and 9999
    const num = drawPositiveDiscreteUniform(9999);
    const numStr = num.toString().padStart(4, '0');
    // Random 8 letter alphanumeric sequence
    const alphanum = new Array(8);
    for (let idx = 0; idx < 8; idx++) {
        alphanum[idx] =
            alphanumeric[drawPositiveDiscreteUniform(alphanumeric.length - 1)];
    }
    const alphanumStr = alphanum.join('');
    return `${numStr}${alphanumStr}`;
};
const extractAndAssertOrderFromRequestParams = (requestParams) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    const order = requestParams['DS_MERCHANT_ORDER'] ||
        requestParams['Ds_Merchant_Order'];
    if (typeof order !== 'string' || !order) {
        throw new ParseError('Missing order number');
    }
    return order;
};
const extractAndAssertOrderFromResponseParams = (responseParams) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
    const order = responseParams['Ds_Order'] ||
        responseParams['DS_ORDER'];
    if (typeof order !== 'string' || !order) {
        throw new ParseError('Missing order number');
    }
    return order;
};
/**
 * Indicates if a response code signals success
 *
 * @public
 */
const isResponseCodeOk = (responseCode) => {
    const numResCode = typeof responseCode === 'string'
        ? Number.parseInt(responseCode)
        : responseCode;
    return (Number.isFinite(numResCode) &&
        ((numResCode >= 0 && numResCode < 100) ||
            numResCode === 400 || // Transaction cancellation authorized
            numResCode === 900) // Refund authorized
    );
};
/**
 * Asserts that a response code indicates success
 *
 * @public
 */
const assertSuccessfulResponseCode = (responseCode) => {
    if (responseCode == null) {
        throw new ParseError('Missing response code');
    }
    if (!isResponseCodeOk(responseCode)) {
        throw new ResponseError({
            code: typeof responseCode === 'string'
                ? Number.parseInt(responseCode)
                : responseCode
        });
    }
};
/**
 * Asserts that response has a code indicating success
 *
 * @public
 */
const assertSuccessfulResponse = (responseParams) => {
    const { Ds_Response: resCode } = responseParams;
    if (resCode == null) {
        throw new ParseError('Missing response code');
    }
    if (!isResponseCodeOk(resCode)) {
        throw new ResponseError({
            code: Number.parseInt(resCode),
            response: responseParams
        });
    }
};
const isStringNotEmpty = (str) => str != null && str.length > 0;
/**
 * Map over maybe monad
 *
 * If value is defined apply function and return output, otherwise return undefined.
 */
const mapMaybeMonad = (value, fn) => {
    return value !== undefined
        ? fn(value)
        : undefined;
};

const sha256VerifyJSONResponse = (merchantKey, response, responseParams) => {
    if (response.Ds_SignatureVersion !== 'HMAC_SHA256_V1') {
        throw new RedsysError(`Unknown signature version: ${response.Ds_SignatureVersion}`);
    }
    const order = extractAndAssertOrderFromResponseParams(responseParams);
    const signature = response.Ds_Signature;
    // Base64url with padding, only substitutes + and /
    const expSignature = sha256Sign(merchantKey, order, response.Ds_MerchantParameters);
    // Comparing different base64 encodings is messy. Make it foolproof by comparing buffers.
    if (!signature ||
        !Buffer.from(expSignature, 'base64').equals(base64url.toBuffer(signature))) {
        throw new ParseError('Invalid signature');
    }
};
const sha256SignJSONRequest = (merchantKey, serializedParams, requestParams) => {
    const order = extractAndAssertOrderFromRequestParams(requestParams);
    const signature = sha256Sign(merchantKey, order, serializedParams);
    return {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters: serializedParams,
        Ds_Signature: signature
    };
};

const deserializeAndVerifyJSONResponse = (merchantKey, response) => {
    const params = deserializeJSONMerchantParams(response.Ds_MerchantParameters);
    sha256VerifyJSONResponse(merchantKey, response, params);
    return params;
};
const serializeAndSignJSONRequest = (merchantKey, requestParams) => {
    const serializedParams = serializeJSONMerchantParams(requestParams);
    return sha256SignJSONRequest(merchantKey, serializedParams, requestParams);
};

const serializeSoapNotificationResponse = ({ allow: allowOperation }) => {
    const answer = allowOperation ? 'OK' : 'KO';
    return `<Response Ds_Version="0.0"><Ds_Response_Merchant>${answer}</Ds_Response_Merchant></Response>`;
};
const xmlParser = new fastXmlParser.XMLParser({ parseTagValue: false });
const deserializeSoapNotification = (xml) => {
    return xmlParser.parse(xml).Message;
};

const verifySoapNotification = (merchantKey, xml, msg) => {
    const startToken = '<Request';
    const endToken = '</Request>';
    const startPos = xml.indexOf(startToken);
    const endPos = xml.indexOf(endToken);
    if (startPos < 0 || endPos < 0 || startPos > endPos) {
        throw new ParseError('Cannot find payload of SOAP notification Request', xml);
    }
    const signedStr = xml.slice(startPos, endPos + endToken.length);
    const signature = msg.Signature;
    const order = msg.Request.Ds_Order;
    if (order == null || !order) {
        throw new ParseError('Invalid notification response');
    }
    const expSignature = sha256Sign(merchantKey, order, signedStr);
    if (!signature || signature !== expSignature) {
        throw new ParseError('Invalid signature', signature, xml);
    }
};
const signSoapNotificationResponse = (merchantKey, serializedResponse, response) => {
    const signature = sha256Sign(merchantKey, response.order, serializedResponse);
    return `<Message>${serializedResponse}<Signature>${signature}</Signature></Message>`;
};

const serializeAndSignSoapNotificationResponse = (merchantKey, response) => {
    const serializedResponse = serializeSoapNotificationResponse(response);
    return signSoapNotificationResponse(merchantKey, serializedResponse, response);
};
const deserializeAndVerifySoapNotification = (merchantKey, xml) => {
    const msg = deserializeSoapNotification(xml);
    verifySoapNotification(merchantKey, xml, msg);
    // Return only parameters. Signature is useless after verification
    return msg.Request;
};

const jsonRequest = async (url, merchantKey, rawRequestParams) => {
    var _a, _b, _c;
    const payload = serializeAndSignJSONRequest(merchantKey, rawRequestParams);
    try {
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': false,
                // 'Access-Control-Allow-Origin': '*' // Ensure to match your CORS policy
            }
        });
        const responseData = response.data;
        if ('errorCode' in responseData) {
            throw new GatewayError({
                code: responseData.errorCode,
                response: responseData
            });
        }
        return deserializeAndVerifyJSONResponse(merchantKey, responseData);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const response = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            throw new HTTPError({
                code: (_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.status) !== null && _c !== void 0 ? _c : 500,
                response
            });
        }
        throw error; // Rethrow unexpected errors
    }
};

/**
 * Redsys production urls
 *
 * @public
 */
const PRODUCTION_URLS = {
    redirect: 'https://sis.redsys.es/sis/realizarPago',
    restTrataPeticion: 'https://sis.redsys.es/sis/rest/trataPeticionREST',
    restIniciaPeticion: 'https://sis.redsys.es/sis/rest/iniciaPeticionREST'
};
/**
 * Redsys sandbox urls
 *
 * @public
 */
const SANDBOX_URLS = {
    redirect: 'https://sis-t.redsys.es:25443/sis/realizarPago',
    restTrataPeticion: 'https://sis-t.redsys.es:25443/sis/rest/trataPeticionREST',
    restIniciaPeticion: 'https://sis-t.redsys.es:25443/sis/rest/iniciaPeticionREST'
};
/**
 * Creates Redsys API functions
 *
 * @remarks
 * These API functions are anonymous and can be wrapped by formatters and processors
 *
 * @public
 */
const createRedsysAPI = (config) => {
    if (!config.secretKey || typeof config.secretKey !== 'string') {
        throw new RedsysError('A secretKey key must be provided');
    }
    if (typeof config.urls !== 'object' ||
        config.urls == null ||
        !config.urls.restIniciaPeticion ||
        !config.urls.restTrataPeticion ||
        !config.urls.redirect) {
        throw new RedsysError('URLs must be provided');
    }
    /**
     * Sends a iniciaPeticion request using REST interface
     */
    const restIniciaPeticion = async (paramsInput) => {
        return await jsonRequest(config.urls.restIniciaPeticion, config.secretKey, paramsInput);
    };
    /**
     * Sends a trataPeticion request using REST interface
     */
    const restTrataPeticion = async (paramsInput) => {
        const result = await jsonRequest(config.urls.restTrataPeticion, config.secretKey, paramsInput);
        return result;
    };
    /**
     * Creates the parameters needed for a redirect form
     */
    const createRedirectForm = (paramsInput) => {
        const body = serializeAndSignJSONRequest(config.secretKey, paramsInput);
        return {
            url: config.urls.redirect,
            body
        };
    };
    /**
     * Processes a JSON REST notification
     */
    const processRestNotification = (
    /** Body of JSON notification, as a POJO (Plain Old Javascript Object) */
    body) => {
        // A notification can't contain a gateway error, it didn't initiate the request
        return deserializeAndVerifyJSONResponse(config.secretKey, body);
    };
    /**
     * Parses and verifies the body of a SOAP notification
     */
    const processSoapNotification = (
    /** SOAP notification as a XML string */
    xml) => {
        return deserializeAndVerifySoapNotification(config.secretKey, xml);
    };
    /**
     * Creates an answer for a SOAP notification, serializes and signs it
     */
    const createSoapNotificationAnswer = (
    /** Order identifier */
    order, 
    /** Indicates if the payment is allowed to proceed */
    allow) => {
        return serializeAndSignSoapNotificationResponse(config.secretKey, {
            order,
            allow
        });
    };
    return {
        restIniciaPeticion,
        restTrataPeticion,
        createRedirectForm,
        processRestNotification,
        processSoapNotification,
        createSoapNotificationAnswer
    };
};

/*
 * 3DS method form
 */
/**
 * Creates parameters for a 3DS method form
 *
 * @public
 */
const create3DSMethodForm = (emv3dsParams, notificationURL) => {
    const methodData = {
        threeDSServerTransID: emv3dsParams.threeDSServerTransID,
        threeDSMethodNotificationURL: notificationURL
    };
    return {
        url: emv3dsParams.threeDSMethodURL,
        body: {
            threeDSMethodData: base64url.encode(JSON.stringify(methodData))
        }
    };
};
/**
 * Creates parameters for a 3DS v1 challenge form
 *
 * @public
 */
const create3DSv1ChallengeForm = (emv3dsV1Challenge, challengeNotificationUrl) => {
    return {
        url: emv3dsV1Challenge.acsURL,
        body: {
            PaReq: emv3dsV1Challenge.PAReq,
            MD: emv3dsV1Challenge.MD,
            TermUrl: challengeNotificationUrl
        }
    };
};
/**
 * Creates parameters for a 3DS v2 challenge form
 *
 * @public
 */
const create3DSv2ChallengeForm = (emv3dsV2Challenge) => {
    return {
        url: emv3dsV2Challenge.acsURL,
        body: {
            creq: emv3dsV2Challenge.creq
        }
    };
};
/**
 * Deserialize threeDSMethodData
 *
 * @public
 */
const deserializeThreeDSMethodData = (threeDSMethodData) => {
    return JSON.parse(base64url.decode(threeDSMethodData));
};
/**
 * Deserialize `cres` field of a 3DS v2 challenge
 *
 * @public
 */
const deserializeCres = (cres) => {
    return JSON.parse(Buffer.from(cres, 'base64').toString('utf8'));
};

const unescapeXML = (str) => {
    const xml = str.replace(/&(lt|#60|gt|#62|quot|#34|amp|#38|apos|#39);/g, (_match, p1) => {
        switch (p1) {
            case 'lt':
            case '#60':
                return '<';
            case 'gt':
            case '#62':
                return '>';
            case 'quot':
            case '#34':
                return '"';
            case 'amp':
            case '#38':
                return '&';
            case 'apos':
            case '#39':
                return "'";
            default:
                throw new ParseError('Unknown xml escape character', p1, str);
        }
    });
    return xml;
};
const escapeXML = (str) => {
    const xml = str.replace(/<|>|"|&|'/g, (match) => {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case '&':
                return '&amp;';
            case "'":
                return '&apos;';
            default:
                throw new ParseError('Unknown special xml character', match, str);
        }
    });
    return xml;
};
/**
 * Detects the soap version of a HTTP request
 *
 * @public
 */
const detectSoapVersion = (req) => {
    var _a;
    const contentType = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['Content-Type'];
    if (contentType != null && contentType) {
        if (contentType.includes('soap+xml')) {
            return '1.2';
        }
        else {
            return '1.1';
        }
    }
    else if (req.body != null && req.body) {
        if (req.body.includes('www.w3.org/2003/05/soap-envelope')) {
            return '1.2';
        }
        else if (req.body.includes('schemas.xmlsoap.org/soap/envelope')) {
            return '1.1';
        }
    }
    throw new ParseError('Not a valid SOAP request', req);
};
/**
 * Extracts the body of a SOAP notification from the body of the HTTP request
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
const mimicSoapNotificationReceiver = (xml) => {
    const regex = /<(?:\w+:)?XML(?: [^<>]+)?>([^<>]+)<\/(?:\w+:)?XML>/;
    const matchArray = regex.exec(xml);
    const xmlContent = matchArray ? matchArray[1] : undefined;
    if (xmlContent == null) {
        throw new ParseError('Invalid SOAP notification', xml);
    }
    // wsdl defines XML tag as a string. It cannot be a CDATA (which is a XML element).
    return unescapeXML(xmlContent);
};
/**
 * Creates the body of a HTTP response as SOAP 1.1 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
const mimicSoap11NotificationResponse = (answer) => {
    const escapedAnswer = escapeXML(answer);
    return `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body soap:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"><q2:procesaNotificacionSISResponse xmlns:q2="InotificacionSIS"><return xsi:type="xsd:string">${escapedAnswer}</return></q2:procesaNotificacionSISResponse></soap:Body></soap:Envelope>`;
};
/**
 * Creates the body of a HTTP response as SOAP 1.2 from the body of a SOAP notification response
 *
 * @remarks
 * It does not understand SOAP or use WSDL, the implementation is a little bit hacky
 *
 * @public
 */
const mimicSoap12NotificationResponse = (answer) => {
    const escapedAnswer = escapeXML(answer);
    return `<?xml version="1.0" encoding="utf-8"?><soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenc="http://www.w3.org/2003/05/soap-encoding" xmlns:tns="https://sis.sermepa.es/sis/InotificacionSIS.wsdl" xmlns:types="https://sis.sermepa.es/sis/InotificacionSIS.wsdl/encodedTypes" xmlns:rpc="http://www.w3.org/2003/05/soap-rpc" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope"><soap12:Body soap12:encodingStyle="http://www.w3.org/2003/05/soap-encoding"><q4:procesaNotificacionSISResponse xmlns:q4="InotificacionSIS"><rpc:result xmlns="">return</rpc:result><return xsi:type="xsd:string">${escapedAnswer}</return></q4:procesaNotificacionSISResponse></soap12:Body></soap12:Envelope>`;
};

/**
 * Maps a ISO 4217 code to a ISO 4217 currency number and decimal positions
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
const CURRENCIES = {
    ALL: { num: '8', decimals: 2 },
    DZD: { num: '12', decimals: 2 },
    // AOK: { num: '24', decimals: },
    // MON: { num: '30', decimals: },
    // AZM: { num: '31', decimals: },
    // Redsys says 32 is ARP, but that currency code is no longer used
    ARS: { num: '32', decimals: 2 },
    AUD: { num: '36', decimals: 2 },
    BSD: { num: '44', decimals: 2 },
    BHD: { num: '48', decimals: 3 },
    BDT: { num: '50', decimals: 2 },
    AMD: { num: '51', decimals: 2 },
    BBD: { num: '52', decimals: 2 },
    BMD: { num: '60', decimals: 2 },
    BTN: { num: '64', decimals: 2 },
    // Redsys says 68 is BOP, but that currency code is no longer used
    BOB: { num: '68', decimals: 2 },
    // BAD: { num: 70, decimals: },
    BWP: { num: '72', decimals: 2 },
    // BRC: { num: 76, decimals: },
    BZD: { num: '84', decimals: 2 },
    SBD: { num: '90', decimals: 2 },
    BND: { num: '96', decimals: 2 },
    // BGL: { num: '100', decimals: },
    MMK: { num: '104', decimals: 2 },
    BIF: { num: '108', decimals: 0 },
    // BYB: { num: '112', decimals: },
    KHR: { num: '116', decimals: 2 },
    CAD: { num: '124', decimals: 2 },
    CVE: { num: '132', decimals: 2 },
    KYD: { num: '136', decimals: 2 },
    LKR: { num: '144', decimals: 2 },
    CLP: { num: '152', decimals: 0 },
    CNY: { num: '156', decimals: 2 },
    // CNH: { num: '157', decimals: },
    COP: { num: '170', decimals: 2 },
    KMF: { num: '174', decimals: 0 },
    // ZRZ: { num: '180', decimals: },
    CRC: { num: '188', decimals: 2 },
    HRK: { num: '191', decimals: 2 },
    CUP: { num: '192', decimals: 2 },
    // CYP: { num: '196', decimals: },
    // CSK: { num: '200', decimals: },
    CZK: { num: '203', decimals: 2 },
    DKK: { num: '208', decimals: 2 },
    DOP: { num: '214', decimals: 2 },
    // ECS: { num: '218', decimals: },
    SVC: { num: '222', decimals: 2 },
    // GQE: { num: '226', decimals: },
    ETB: { num: '230', decimals: 2 },
    ERN: { num: '232', decimals: 2 },
    // EEK: { num: '233', decimals: },
    FKP: { num: '238', decimals: 2 },
    FJD: { num: '242', decimals: 2 },
    DJF: { num: '262', decimals: 0 },
    // GEL: { num: '268', decimals: },
    GMD: { num: '270', decimals: 2 },
    // DDM: { num: '278', decimals: },
    // GHC: { num: '288', decimals: },
    GIP: { num: '292', decimals: 2 },
    GTQ: { num: '320', decimals: 2 },
    // Redsys says 324 is GNS, but that may be incorrect
    GNF: { num: '324', decimals: 0 },
    GYD: { num: '328', decimals: 2 },
    HTG: { num: '332', decimals: 2 },
    HNL: { num: '340', decimals: 2 },
    HKD: { num: '344', decimals: 2 },
    HUF: { num: '348', decimals: 2 },
    ISK: { num: '352', decimals: 0 },
    INR: { num: '356', decimals: 2 },
    IDR: { num: '360', decimals: 2 },
    IRR: { num: '364', decimals: 2 },
    // IRA: { num: '365', decimals: },
    IQD: { num: '368', decimals: 3 },
    ILS: { num: '376', decimals: 2 },
    JMD: { num: '388', decimals: 2 },
    JPY: { num: '392', decimals: 0 },
    KZT: { num: '398', decimals: 2 },
    JOD: { num: '400', decimals: 3 },
    KES: { num: '404', decimals: 2 },
    KPW: { num: '408', decimals: 2 },
    KRW: { num: '410', decimals: 0 },
    KWD: { num: '414', decimals: 3 },
    KGS: { num: '417', decimals: 2 },
    LAK: { num: '418', decimals: 2 },
    LBP: { num: '422', decimals: 2 },
    // Redsys says 426 is LSM, but that may be incorrect
    LSL: { num: '426', decimals: 2 },
    // LVL: { num: '428', decimals: },
    LRD: { num: '430', decimals: 2 },
    LYD: { num: '434', decimals: 3 },
    // LTL: { num: '440', decimals: },
    MOP: { num: '446', decimals: 2 },
    // MGF: { num: '450', decimals: },
    MWK: { num: '454', decimals: 2 },
    MYR: { num: '458', decimals: 2 },
    MVR: { num: '462', decimals: 2 },
    // MLF: { num: '466', decimals: },
    // MTL: { num: '470', decimals: },
    // MRO: { num: '478', decimals: },
    MUR: { num: '480', decimals: 2 },
    // Redsys says 484 is MXP, but that currency code is no longer used
    MXN: { num: '484', decimals: 2 },
    MNT: { num: '496', decimals: 2 },
    MDL: { num: '498', decimals: 2 },
    MAD: { num: '504', decimals: 2 },
    // MZM: { num: '508', decimals: },
    OMR: { num: '512', decimals: 3 },
    NAD: { num: '516', decimals: 2 },
    NPR: { num: '524', decimals: 2 },
    ANG: { num: '532', decimals: 2 },
    AWG: { num: '533', decimals: 2 },
    // NTZ: { num: '536', decimals: },
    VUV: { num: '548', decimals: 0 },
    NZD: { num: '554', decimals: 2 },
    // Redsys says 558 is NIC, but that currency code is no longer used
    NIO: { num: '558', decimals: 2 },
    NGN: { num: '566', decimals: 2 },
    NOK: { num: '578', decimals: 2 },
    // PCI: { num: '582', decimals: },
    PKR: { num: '586', decimals: 2 },
    PAB: { num: '590', decimals: 2 },
    PGK: { num: '598', decimals: 2 },
    PYG: { num: '600', decimals: 0 },
    // Redsys says 604 is PEI, but that currency code is no longer used
    PEN: { num: '604', decimals: 2 },
    PHP: { num: '608', decimals: 2 },
    // PLZ: { num: '616', decimals: },
    // GWP: { num: '624', decimals: },
    // TPE: { num: '626', decimals: },
    QAR: { num: '634', decimals: 2 },
    // ROL: { num: '642', decimals: },
    RUB: { num: '643', decimals: 2 },
    RWF: { num: '646', decimals: 0 },
    SHP: { num: '654', decimals: 2 },
    // STD: { num: '678', decimals: },
    SAR: { num: '682', decimals: 2 },
    SCR: { num: '690', decimals: 2 },
    SLL: { num: '694', decimals: 2 },
    SGD: { num: '702', decimals: 2 },
    // SKK: { num: '703', decimals: },
    VND: { num: '704', decimals: 0 },
    // SIT: { num: '705', decimals: },
    SOS: { num: '706', decimals: 2 },
    ZAR: { num: '710', decimals: 2 },
    // ZWD: { num: '716', decimals: },
    // YDD: { num: '720', decimals: },
    SSP: { num: '728', decimals: 2 },
    // SDP: { num: '736', decimals: },
    // SDA: { num: '737', decimals: },
    // SRG: { num: '740', decimals: },
    SZL: { num: '748', decimals: 2 },
    SEK: { num: '752', decimals: 2 },
    CHF: { num: '756', decimals: 2 },
    SYP: { num: '760', decimals: 2 },
    // TJR: { num: '762', decimals: },
    THB: { num: '764', decimals: 2 },
    TOP: { num: '776', decimals: 2 },
    TTD: { num: '780', decimals: 2 },
    AED: { num: '784', decimals: 2 },
    TND: { num: '788', decimals: 3 },
    // TRL: { num: '792', decimals: },
    // PTL: { num: '793', decimals: },
    // TMM: { num: '795', decimals: },
    // Redsys says 800 is UGS, but that currency code is no longer used
    UGX: { num: '800', decimals: 0 },
    // UAK: { num: '804', decimals: },
    MKD: { num: '807', decimals: 2 },
    // RUR: { num: '810', decimals: },
    EGP: { num: '818', decimals: 2 },
    GBP: { num: '826', decimals: 2 },
    TZS: { num: '834', decimals: 2 },
    USD: { num: '840', decimals: 2 },
    // Redsys says 858 is UYP, but that currency code is no longer used
    UYU: { num: '858', decimals: 2 },
    UZS: { num: '860', decimals: 2 },
    // VEB: { num: '862', decimals: },
    WST: { num: '882', decimals: 2 },
    YER: { num: '886', decimals: 2 },
    // YUD: { num: '890', decimals: },
    // YUG: { num: '891', decimals: },
    // ZMK: { num: '892', decimals: },
    TWD: { num: '901', decimals: 2 },
    TMT: { num: '934', decimals: 2 },
    GHS: { num: '936', decimals: 2 },
    RSD: { num: '941', decimals: 2 },
    MZN: { num: '943', decimals: 2 },
    AZN: { num: '944', decimals: 2 },
    RON: { num: '946', decimals: 2 },
    TRY: { num: '949', decimals: 2 },
    XAF: { num: '950', decimals: 0 },
    XCD: { num: '951', decimals: 2 },
    XOF: { num: '952', decimals: 0 },
    XPF: { num: '953', decimals: 0 },
    // XEU: { num: '954', decimals: },
    ZMW: { num: '967', decimals: 2 },
    SRD: { num: '968', decimals: 2 },
    // MGA: { num: '969', decimals: },
    AFN: { num: '971', decimals: 2 },
    TJS: { num: '972', decimals: 2 },
    AOA: { num: '973', decimals: 2 },
    // BYR: { num: '974', decimals: },
    BGN: { num: '975', decimals: 2 },
    CDF: { num: '976', decimals: 2 },
    BAM: { num: '977', decimals: 2 },
    EUR: { num: '978', decimals: 2 },
    UAH: { num: '980', decimals: 2 },
    GEL: { num: '981', decimals: 2 },
    PLN: { num: '985', decimals: 2 },
    BRL: { num: '986', decimals: 2 }
    // ZAL: { num: '991', decimals: }
};
/**
 * Maps a ISO 4217 number to a ISO 4217 currency code and decimal positions
 *
 * @remarks
 * @see {@link CURRENCIES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const REV_CURRENCIES = {};
for (const [key, value] of Object.entries(CURRENCIES)) {
    REV_CURRENCIES[value.num] = {
        code: key,
        decimals: value.decimals
    };
}

/**
 * Maps an ISO 639-1 language code to redsys language number
 *
 * @remarks
 * Some ISO 639-1 language codes may include more more than one redsys language number. In such cases the main redsys language number is used.
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
const LANGUAGES = {
    es: '1',
    en: '2',
    ca: '3', // Codigo ISO "ca" compartido por catalan(3) y valenciano(10)
    fr: '4',
    de: '5',
    nl: '6',
    it: '7',
    sv: '8',
    pt: '9',
    pl: '11',
    gl: '12',
    eu: '13',
    // Redsys ha utilizado ISO 3166-1(pais) como codigo de idioma para el resto
    bg: '100',
    zh: '156',
    hr: '191',
    cs: '203',
    da: '208',
    et: '233',
    fi: '246',
    el: '300',
    hu: '348',
    ja: '392',
    lv: '428',
    lt: '440',
    mt: '470',
    ro: '642',
    ru: '643',
    sk: '703',
    sl: '705',
    tr: '792'
};
/**
 * Maps a redsys language code to an ISO 639-1 language code
 *
 * @remarks
 * @see {@link LANGUAGES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const REV_LANGUAGES = {};
for (const [key, value] of Object.entries(LANGUAGES)) {
    REV_LANGUAGES[value] = key;
}
REV_LANGUAGES['10'] = 'ca';

/**
 * Maps ISO 3166 Alpha 2 codes to UN M49 numbers
 *
 * @remarks
 * [UN M49 to ISO 3166 information](https://unstats.un.org/unsd/methodology/m49/)
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
const COUNTRIES = {
    af: '4',
    al: '8',
    aq: '10',
    dz: '12',
    as: '16',
    ad: '20',
    ao: '24',
    ag: '28',
    az: '31',
    ar: '32',
    au: '36',
    at: '40',
    bs: '44',
    bh: '48',
    bd: '50',
    am: '51',
    bb: '52',
    be: '56',
    bm: '60',
    bt: '64',
    bo: '68',
    ba: '70',
    bw: '72',
    bv: '74',
    br: '76',
    bz: '84',
    io: '86',
    sb: '90',
    vg: '92',
    bn: '96',
    bg: '100',
    mm: '104',
    bi: '108',
    by: '112',
    kh: '116',
    cm: '120',
    ca: '124',
    cv: '132',
    ky: '136',
    cf: '140',
    lk: '144',
    td: '148',
    cl: '152',
    cn: '156',
    tw: '158',
    cx: '162',
    cc: '166',
    co: '170',
    km: '174',
    yt: '175',
    cg: '178',
    cd: '180',
    ck: '184',
    cr: '188',
    hr: '191',
    cu: '192',
    cy: '196',
    cz: '203',
    bj: '204',
    dk: '208',
    dm: '212',
    do: '214',
    ec: '218',
    sv: '222',
    gq: '226',
    et: '231',
    er: '232',
    ee: '233',
    fo: '234',
    fk: '238',
    gs: '239',
    fj: '242',
    fi: '246',
    ax: '248',
    fr: '250',
    gf: '254',
    pf: '258',
    tf: '260',
    dj: '262',
    ga: '266',
    ge: '268',
    gm: '270',
    ps: '275',
    de: '276',
    gh: '288',
    gi: '292',
    ki: '296',
    gr: '300',
    gl: '304',
    gd: '308',
    gp: '312',
    gu: '316',
    gt: '320',
    gn: '324',
    gy: '328',
    ht: '332',
    hm: '334',
    va: '336',
    hn: '340',
    hk: '344',
    hu: '348',
    is: '352',
    in: '356',
    id: '360',
    ir: '364',
    iq: '368',
    ie: '372',
    il: '376',
    it: '380',
    ci: '384',
    jm: '388',
    jp: '392',
    kz: '398',
    jo: '400',
    ke: '404',
    kp: '408',
    kr: '410',
    kw: '414',
    kg: '417',
    la: '418',
    lb: '422',
    ls: '426',
    lv: '428',
    lr: '430',
    ly: '434',
    li: '438',
    lt: '440',
    lu: '442',
    mo: '446',
    mg: '450',
    mw: '454',
    my: '458',
    mv: '462',
    ml: '466',
    mt: '470',
    mq: '474',
    mr: '478',
    mu: '480',
    mx: '484',
    mc: '492',
    mn: '496',
    md: '498',
    me: '499',
    ms: '500',
    ma: '504',
    mz: '508',
    om: '512',
    na: '516',
    nr: '520',
    np: '524',
    nl: '528',
    cw: '531',
    aw: '533',
    sx: '534',
    bq: '535',
    nc: '540',
    vu: '548',
    nz: '554',
    ni: '558',
    ne: '562',
    ng: '566',
    nu: '570',
    nf: '574',
    no: '578',
    mp: '580',
    um: '581',
    fm: '583',
    mh: '584',
    pw: '585',
    pk: '586',
    pa: '591',
    pg: '598',
    py: '600',
    pe: '604',
    ph: '608',
    pn: '612',
    pl: '616',
    pt: '620',
    gw: '624',
    tl: '626',
    pr: '630',
    qa: '634',
    re: '638',
    ro: '642',
    ru: '643',
    rw: '646',
    bl: '652',
    sh: '654',
    kn: '659',
    ai: '660',
    lc: '662',
    mf: '663',
    pm: '666',
    vc: '670',
    sm: '674',
    st: '678',
    sa: '682',
    sn: '686',
    rs: '688',
    sc: '690',
    sl: '694',
    sg: '702',
    sk: '703',
    vn: '704',
    si: '705',
    so: '706',
    za: '710',
    zw: '716',
    es: '724',
    ss: '728',
    sd: '729',
    eh: '732',
    sr: '740',
    sj: '744',
    sz: '748',
    se: '752',
    ch: '756',
    sy: '760',
    tj: '762',
    th: '764',
    tg: '768',
    tk: '772',
    to: '776',
    tt: '780',
    ae: '784',
    tn: '788',
    tr: '792',
    tm: '795',
    tc: '796',
    tv: '798',
    ug: '800',
    ua: '804',
    mk: '807',
    eg: '818',
    gb: '826',
    gg: '831',
    je: '832',
    im: '833',
    tz: '834',
    us: '840',
    vi: '850',
    bf: '854',
    uy: '858',
    uz: '860',
    ve: '862',
    wf: '876',
    ws: '882',
    ye: '887',
    zm: '894'
};
/**
 * Maps UN M49 numbers to ISO 3166 Alpha 2 codes
 *
 * @remarks
 * @see {@link COUNTRIES}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const REV_COUNTRIES = {};
for (const [key, value] of Object.entries(COUNTRIES)) {
    REV_COUNTRIES[value] = key;
}

/**
 * Card brand name to number
 *
 * @public
 */
// The Record key makes sure that all members of the key union type are defined.
const CARDBRANDS = {
    VISA: '1',
    MASTERCARD: '2',
    DINERS: '6',
    PRIVATE: '7',
    AMEX: '8',
    JCB: '9',
    UPI: '22'
};
/**
 * Card brand number to name
 *
 * @remarks
 * @see {@link CARDBRANDS}
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const REV_CARDBRANDS = {};
for (const [key, value] of Object.entries(CARDBRANDS)) {
    REV_CARDBRANDS[value] = key;
}

/**
 * Transaction type enum
 *
 * @public
 */
const TRANSACTION_TYPES = {
    /** Autorización */
    AUTHORIZATION: '0',
    /** Preautorización */
    PRE_AUTHORIZATION: '1',
    /** Confirmación de preautorización */
    CONFIRMATION: '2',
    /** Devolución Automática */
    AUTO_REFUND: '3',
    /** Transacción Recurrente */
    RECURRING_TRANSACTION: '5',
    /** Transacción Sucesiva */
    SUCCESSIVE_TRANSACTION: '6',
    /** Pre-autenticación */
    PRE_AUTHENTICATION: '7',
    /** Confirmación de pre-autenticación */
    PRE_AUTHENTICATION_CONFIRMATION: '8',
    /** Anulación de Preautorización */
    PRE_AUTHORIZATION_CANCEL: '9',
    /** Autorización en diferido */
    DEFERRED_AUTHORIZATION: 'O',
    /** Paygold */
    PAYGOLD: '15',
    /** Autenticación Puce */
    PUCE_AUTH: '17',
    /** Devolución sin original */
    RETURN_WITHOUT_ORIGINAL: '34',
    /** Premio de apuestas */
    BETTING_PAYOUT: '37',
    /** Eliminar referencia */
    DELETE_REFERENCE: '44',
    /** Operaciones sin autenticacíon */
    NO_AUTHENTICATION: 'A',
    /** Paygold */
    PAYLINK: 'F',
    /** Confirmación de autorización en diferido */
    DEFERRED_AUTHORIZATION_CONFIRMATION: 'P',
    /** Anulación de autorización en diferido */
    DEFERRED_AUTHORIZATION_CANCEL: 'Q',
    /** Cuota inicial diferido */
    DEFERRED_INITIAL_FEE: 'R',
    /** Cuota sucesiva diferido */
    DEFERRED_SUCCESSIVE_FEE: 'S'
};

/**
 * Applies an input formatter to the first argument of a function
 *
 * @remarks
 * The signature of this function is so complex because tries to suport
 * formatters with generics that provide a default type. This should remain
 * until [variadic generics](https://github.com/microsoft/TypeScript/issues/5453)
 * land in typescript
 *
 * @public
 */
const useSingleInputFormatter = (fn, inputFormatter) => {
    return (input, ...otherArgs) => fn(inputFormatter(input), ...otherArgs);
};
/**
 * Applies an output formatter to a function
 *
 * @public
 */
const useOutputFormatter = (fn, outputFormatter) => {
    return (a) => outputFormatter(fn(a));
};
/**
 * Applies an output formatter to the resolved ouput promise of a function
 *
 * @public
 */
const usePromiseOutputFormatter = (fn, outputFormatter) => {
    return async (a) => outputFormatter(await fn(a));
};

const formatInputCurrency = (input) => {
    const currencyData = CURRENCIES[input];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!(currencyData === null || currencyData === void 0 ? void 0 : currencyData.num)) {
        throw new ValidationError('Unsupported currency', { currency: input });
    }
    return currencyData.num;
};
const formatExpiryDate = ({ expiryYear, expiryMonth }) => {
    if ((expiryMonth === null || expiryMonth === void 0 ? void 0 : expiryMonth.length) !== 2) {
        throw new ValidationError('Invalid expiryMonth', { expiryMonth });
    }
    if ((expiryYear === null || expiryYear === void 0 ? void 0 : expiryYear.length) !== 2) {
        throw new ValidationError('Invalid expiryYear', { expiryYear });
    }
    return `${expiryYear}${expiryMonth}`;
};
/**
 * Converts a monetary amount from a decimal string currency unit to the atomic currency unit
 */
const formatAmount = (value, context) => {
    const { currency } = context;
    if (!currency) {
        throw new ValidationError('Missing currency', { currency });
    }
    const currencyData = CURRENCIES[currency];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!(currencyData === null || currencyData === void 0 ? void 0 : currencyData.decimals)) {
        throw new ValidationError('Unsupported currency', { currency });
    }
    const rawValue = typeof value === 'number'
        ? Math.round(value * Math.pow(10, currencyData.decimals)).toString()
        : new Decimal(value)
            .mul(Math.pow(10, currencyData.decimals))
            .round()
            .toFixed(0);
    if (rawValue.length > 12) {
        throw new ValidationError('Amount to charge is too large', {
            amount: value
        });
    }
    return rawValue;
};
const formatLang$1 = (value) => {
    const langInt = LANGUAGES[value];
    if (langInt == null) {
        throw new ValidationError('Invalid lang code', { lang: value });
    }
    return langInt;
};
const baseInputFormatter = (input) => {
    const { order, merchantCode, transactionType, terminal, amount, currency, merchantName, identifier, group, expiryYear, expiryMonth, pan, cvv, directPayment, merchantData, operationId, productDescription, taxReference, transactionDate, cardHolder, merchantURL, successURL, errorURL, payMethods, lang, raw, ...unknownInput } = input;
    const unknownKeys = Object.keys(unknownInput);
    if (unknownKeys.length > 0) {
        throw new ValidationError([
            `Unknown parameters: ${unknownKeys.join(', ')}`,
            'To pass raw parameters, use "raw"'
        ].join('\n'), unknownInput);
    }
    return {
        DS_MERCHANT_ORDER: order,
        DS_MERCHANT_MERCHANTCODE: merchantCode,
        DS_MERCHANT_TRANSACTIONTYPE: transactionType,
        DS_MERCHANT_TERMINAL: terminal,
        ...(amount != null
            ? { DS_MERCHANT_AMOUNT: formatAmount(amount, { currency }) }
            : undefined),
        ...(isStringNotEmpty(currency)
            ? { DS_MERCHANT_CURRENCY: formatInputCurrency(currency) }
            : undefined),
        ...(isStringNotEmpty(merchantName)
            ? { DS_MERCHANT_MERCHANTNAME: merchantName }
            : undefined),
        ...(isStringNotEmpty(identifier)
            ? { DS_MERCHANT_IDENTIFIER: identifier }
            : undefined),
        ...(isStringNotEmpty(group) ? { DS_MERCHANT_GROUP: group } : undefined),
        ...(isStringNotEmpty(expiryYear) || isStringNotEmpty(expiryMonth)
            ? {
                DS_MERCHANT_EXPIRYDATE: formatExpiryDate({ expiryYear, expiryMonth })
            }
            : undefined),
        ...(isStringNotEmpty(pan) ? { DS_MERCHANT_PAN: pan } : undefined),
        ...(isStringNotEmpty(cvv) ? { DS_MERCHANT_CVV2: cvv } : undefined),
        ...(isStringNotEmpty(directPayment)
            ? { DS_MERCHANT_DIRECTPAYMENT: directPayment }
            : undefined),
        ...(isStringNotEmpty(merchantData)
            ? { DS_MERCHANT_MERCHANTDATA: merchantData }
            : undefined),
        ...(isStringNotEmpty(operationId)
            ? { DS_MERCHANT_IDOPER: operationId }
            : undefined),
        ...(isStringNotEmpty(productDescription)
            ? { DS_MERCHANT_PRODUCTDESCRIPTION: productDescription }
            : undefined),
        ...(isStringNotEmpty(taxReference)
            ? { DS_MERCHANT_TAX_REFERENCE: taxReference }
            : undefined),
        ...(isStringNotEmpty(transactionDate)
            ? { DS_MERCHANT_TRANSACTIONDATE: transactionDate }
            : undefined),
        ...(isStringNotEmpty(cardHolder)
            ? { DS_MERCHANT_TITULAR: cardHolder }
            : undefined),
        ...(isStringNotEmpty(merchantURL)
            ? { DS_MERCHANT_MERCHANTURL: merchantURL }
            : undefined),
        ...(isStringNotEmpty(successURL)
            ? { DS_MERCHANT_URLOK: successURL }
            : undefined),
        ...(isStringNotEmpty(errorURL)
            ? { DS_MERCHANT_URLKO: errorURL }
            : undefined),
        ...(isStringNotEmpty(payMethods)
            ? { DS_MERCHANT_PAYMETHODS: payMethods }
            : undefined),
        ...(isStringNotEmpty(lang)
            ? { DS_MERCHANT_CONSUMERLANGUAGE: formatLang$1(lang) }
            : undefined),
        ...raw
    };
};
/**
 * Redirection input formatter
 *
 * @public
 */
const redirectInputFormatter = (input) => {
    const { ...baseInput } = input;
    return {
        ...baseInputFormatter(baseInput),
        // Overwrite formatted parameters
        ...baseInput.raw
    };
};
const requestInputFormatter = (input) => {
    const { customerMail, customerMobile, smsTemplate, ...baseInput } = input;
    return {
        ...baseInputFormatter(baseInput),
        ...(isStringNotEmpty(customerMobile)
            ? { DS_MERCHANT_CUSTOMER_MOBILE: customerMobile }
            : undefined),
        ...(isStringNotEmpty(customerMail)
            ? { DS_MERCHANT_CUSTOMER_MAIL: customerMail }
            : undefined),
        ...(isStringNotEmpty(smsTemplate)
            ? { DS_MERCHANT_CUSTOMER_SMS_TEXT: smsTemplate }
            : undefined),
        // Overwrite formatted parameters
        ...baseInput.raw
    };
};
/**
 * REST iniciaPeticion input formatter
 *
 * @public
 */
const restIniciaPeticionInputFormatter = (raw) => {
    const { emv3ds, ...requestInput } = raw;
    return {
        ...requestInputFormatter(requestInput),
        ...(emv3ds != null ? { DS_MERCHANT_EMV3DS: emv3ds } : undefined),
        // Overwrite formatted parameters
        ...requestInput.raw
    };
};
/**
 * REST trataPeticion input formatter
 *
 * @public
 */
const restTrataPeticionInputFormatter = (raw) => {
    const { emv3ds, ...requestInput } = raw;
    return {
        ...requestInputFormatter(requestInput),
        ...(emv3ds != null ? { DS_MERCHANT_EMV3DS: emv3ds } : undefined),
        // Overwrite formatted parameters
        ...requestInput.raw
    };
};

dayjs.extend(timezone);
dayjs.extend(utc);
const formatCountry = (rawCountry) => {
    const countryInt = Number.parseInt(rawCountry).toString();
    return REV_COUNTRIES[countryInt];
};
const formatCardBrand = (rawCardBrand) => {
    const cardBrandInt = Number.parseInt(rawCardBrand).toString();
    return REV_CARDBRANDS[cardBrandInt];
};
const formatResponse = (rawResponse) => Number.parseInt(rawResponse);
const baseOutputFormatter = (raw) => {
    const { Ds_MerchantCode: merchantCode, Ds_Terminal: terminal, Ds_Order: order, Ds_SecurePayment: rawSecurePayment, Ds_TransactionType: transactionType, Ds_Card_Country: rawCardCountry, Ds_Card_Brand: rawCardBrand, Ds_Card_PSD2: rawCardPSD2, Ds_MerchantData: merchantData, Ds_Card_Type: cardType, Ds_AuthorisationCode: authorisationCode } = raw;
    return {
        raw,
        merchantCode,
        terminal,
        order,
        transactionType,
        ...(rawSecurePayment != null && rawSecurePayment.length > 0
            ? { securePayment: rawSecurePayment === '1' || rawSecurePayment === '2' }
            : undefined),
        ...(isStringNotEmpty(rawCardCountry)
            ? mapMaybeMonad(formatCountry(rawCardCountry), cardCountry => ({ cardCountry }))
            : undefined),
        ...(isStringNotEmpty(rawCardBrand)
            ? mapMaybeMonad(formatCardBrand(rawCardBrand), cardBrand => ({ cardBrand }))
            : undefined),
        ...(isStringNotEmpty(rawCardPSD2)
            ? { cardPSD2: rawCardPSD2 === 'Y' }
            : undefined),
        ...(isStringNotEmpty(merchantData) ? { merchantData } : undefined),
        ...(isStringNotEmpty(cardType) ? { cardType } : undefined),
        ...(isStringNotEmpty(authorisationCode) ? { authorisationCode } : undefined)
    };
};
const formatPrice = (params) => {
    const { Ds_Amount: rawAmount, Ds_Currency: rawCurrency } = params;
    const currencyInt = Number.parseInt(rawCurrency).toString();
    const currencyInfo = REV_CURRENCIES[currencyInt];
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!currencyInfo) {
        throw new ParseError('Unknown currency', rawCurrency);
    }
    const currency = currencyInfo.code;
    const amount = new Decimal(rawAmount)
        .dividedBy(Math.pow(10, currencyInfo.decimals))
        .toFixed();
    return {
        amount,
        currency
    };
};
const formatLang = (rawLang) => {
    const langInt = Number.parseInt(rawLang).toString();
    return REV_LANGUAGES[langInt];
};
const notificationOutputFormatter = (raw) => {
    const { Ds_ConsumerLanguage: rawConsumerLanguage, Ds_Response: rawResponse } = raw;
    return {
        ...baseOutputFormatter(raw),
        ...formatPrice(raw),
        response: formatResponse(rawResponse),
        ...(isStringNotEmpty(rawConsumerLanguage)
            ? mapMaybeMonad(formatLang(rawConsumerLanguage), lang => ({ lang }))
            : undefined)
    };
};
/**
 * REST notification formatter
 *
 * @public
 */
const restNotificationOutputFormatter = (raw) => {
    const { Ds_Hour: hour, Ds_Date: rawDate } = raw;
    const date = rawDate.split('/').reverse().join('-');
    return {
        ...notificationOutputFormatter(raw),
        time: hour,
        date,
        timestamp: dayjs
            .tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid')
            .toDate()
    };
};
/**
 * SOAP notification formatter
 *
 * @public
 */
const soapNotificationOutputFormatter = (raw) => {
    const { Hora: hour, Fecha: rawDate } = raw;
    const date = rawDate.split('/').reverse().join('-');
    return {
        ...notificationOutputFormatter(raw),
        time: hour,
        date,
        timestamp: dayjs
            .tz(`${date}T${hour}`, 'YYYY-MM-DDTHH:mm', 'Europe/Madrid')
            .toDate()
    };
};
const requestOutputFormatter = (raw) => {
    const { Ds_CardNumber: deprecatedCardNumber, Ds_Card_Number: newCardNumber, Ds_Merchant_Identifier: identifier, Ds_ExpiryDate: rawExpiryDate, Ds_UrlPago2Fases: payURL, Ds_Language: rawLang } = raw;
    const cardNumber = newCardNumber !== null && newCardNumber !== void 0 ? newCardNumber : deprecatedCardNumber;
    return {
        ...baseOutputFormatter(raw),
        ...(isStringNotEmpty(cardNumber) ? { cardNumber } : undefined),
        ...(isStringNotEmpty(identifier) ? { identifier } : undefined),
        ...(isStringNotEmpty(payURL) ? { payURL } : undefined),
        ...(isStringNotEmpty(rawExpiryDate)
            ? {
                expiryYear: rawExpiryDate.slice(0, 2),
                expiryMonth: rawExpiryDate.slice(2, 4)
            }
            : undefined),
        ...(isStringNotEmpty(rawLang)
            ? mapMaybeMonad(formatLang(rawLang), lang => ({ lang }))
            : undefined)
    };
};
/**
 * REST iniciaPeticion output formatter
 *
 * @public
 */
const restIniciaPeticionOutputFormatter = (raw) => {
    const { Ds_EMV3DS: emv3ds } = raw;
    return {
        ...requestOutputFormatter(raw),
        ...(emv3ds != null ? { emv3ds } : undefined)
    };
};
/**
 * REST trataPeticion output formatter
 *
 * @public
 */
const restTrataPeticionOutputFormatter = (raw) => {
    const { Ds_Response: rawResponse, Ds_EMV3DS: emv3ds } = raw;
    return {
        ...requestOutputFormatter(raw),
        ...formatPrice(raw),
        ...(emv3ds != null ? { emv3ds } : undefined),
        ...(rawResponse != null
            ? { response: Number.parseInt(rawResponse) }
            : undefined)
    };
};

exports.CARDBRANDS = CARDBRANDS;
exports.COUNTRIES = COUNTRIES;
exports.CURRENCIES = CURRENCIES;
exports.GatewayError = GatewayError;
exports.HTTPError = HTTPError;
exports.LANGUAGES = LANGUAGES;
exports.PRODUCTION_URLS = PRODUCTION_URLS;
exports.ParseError = ParseError;
exports.REV_CARDBRANDS = REV_CARDBRANDS;
exports.REV_COUNTRIES = REV_COUNTRIES;
exports.REV_CURRENCIES = REV_CURRENCIES;
exports.REV_LANGUAGES = REV_LANGUAGES;
exports.RedsysError = RedsysError;
exports.ResponseError = ResponseError;
exports.SANDBOX_URLS = SANDBOX_URLS;
exports.TRANSACTION_TYPES = TRANSACTION_TYPES;
exports.ValidationError = ValidationError;
exports.assertSuccessfulResponse = assertSuccessfulResponse;
exports.assertSuccessfulResponseCode = assertSuccessfulResponseCode;
exports.create3DSMethodForm = create3DSMethodForm;
exports.create3DSv1ChallengeForm = create3DSv1ChallengeForm;
exports.create3DSv2ChallengeForm = create3DSv2ChallengeForm;
exports.createRedsysAPI = createRedsysAPI;
exports.deserializeCres = deserializeCres;
exports.deserializeThreeDSMethodData = deserializeThreeDSMethodData;
exports.detectSoapVersion = detectSoapVersion;
exports.getResponseCodeMessage = getResponseCodeMessage;
exports.getSISErrorCodeMessage = getSISErrorCodeMessage;
exports.isResponseCodeOk = isResponseCodeOk;
exports.mimicSoap11NotificationResponse = mimicSoap11NotificationResponse;
exports.mimicSoap12NotificationResponse = mimicSoap12NotificationResponse;
exports.mimicSoapNotificationReceiver = mimicSoapNotificationReceiver;
exports.randomTransactionId = randomTransactionId;
exports.redirectInputFormatter = redirectInputFormatter;
exports.restIniciaPeticionInputFormatter = restIniciaPeticionInputFormatter;
exports.restIniciaPeticionOutputFormatter = restIniciaPeticionOutputFormatter;
exports.restNotificationOutputFormatter = restNotificationOutputFormatter;
exports.restTrataPeticionInputFormatter = restTrataPeticionInputFormatter;
exports.restTrataPeticionOutputFormatter = restTrataPeticionOutputFormatter;
exports.soapNotificationOutputFormatter = soapNotificationOutputFormatter;
exports.useOutputFormatter = useOutputFormatter;
exports.usePromiseOutputFormatter = usePromiseOutputFormatter;
exports.useSingleInputFormatter = useSingleInputFormatter;
