const soap = require('soap');
const url = String(process.env.IS_PRODUCTION) === "true"
    ? 'https://label.estafeta.com/EstafetaLabel20/services/EstafetaLabelWS?wsdl'
    : 'https://labelqa.estafeta.com/EstafetaLabel20/services/EstafetaLabelWS?wsdl';

class Estafeta {

    /**
     *
     * @param numberOfLabels
     * @param returnDocument
     * @param weight
     * @param paperType
     * @param valid
     * @param content
     * @param contentDescription
     * @param costCenter
     * @param customerNumber
     * @param deliveryToEstafetaOffice
     * @param destinationCountryId
     * @param effectiveDate
     * @param quadrant
     * @param originZipCodeForRouting
     */
    constructor(numberOfLabels = 1, returnDocument = false, weight = 0.0, paperType = 1,
                valid = true, content = '', contentDescription = '', costCenter = 'CCcost',
                customerNumber = '0000000', deliveryToEstafetaOffice = false,
                destinationCountryId = 'MX', effectiveDate = '20110525', quadrant = 0,
                originZipCodeForRouting = '') {
        this.suscriberId = process.env.ESTAFETA_SUSCRIBER_ID;
        this.login = process.env.ESTAFETA_USER;
        this.password = process.env.ESTAFETA_USER;
        this.serviceTypeId = process.env.ESTAFETA_SERVICE_TYPE_ID;
        this.serviceTypeIdDocRet = process.env.ESTAFETA_SERVICE_TYPE_ID_DOC_RET;
        this.officeNum = process.env.ESTAFETA_NUM_OFFICE;
        this.numberOfLabels = numberOfLabels;
        this.returnDocument = returnDocument;
        this.weight = parseFloat(weight);
        this.paperType = paperType;
        this.valid = valid;
        this.content = content;
        this.contentDescription = contentDescription === "" ? content : contentDescription;
        this.costCenter = costCenter;
        this.customerNumber = customerNumber;
        this.deliveryToEstafetaOffice = deliveryToEstafetaOffice;
        this.destinationCountryId = destinationCountryId;
        this.quadrant = quadrant;
        this.originZipCodeForRouting = originZipCodeForRouting;
    }

    /**
     *
     * @param address1
     * @param address2
     * @param cellphone
     * @param city
     * @param contactName
     * @param corporateName
     * @param customerNumber
     * @param neighborhood
     * @param phoneNumber
     * @param state
     * @param valid
     * @param zipCode
     * @returns {{corporateName: string, valid: boolean, zipCode: string, phoneNumber: string, address2: string, city: string, address1: string, contactName: string, cellphone: string, neighborhood: string, state: string, customerNumber: string}}
     */
    originInfo(address1 = '', address2 = '', cellphone = '', city = '',
               contactName = '', corporateName = '', customerNumber = '0000000',
               neighborhood = '', phoneNumber = '', state = '', valid = true,
               zipCode = '') {
        return {
            address1: address1,
            address2: address2 ? address2 : address1,
            cellphone: cellphone,
            city: city,
            contactName: contactName,
            corporateName: corporateName ? corporateName : contactName,
            customerNumber: customerNumber ? customerNumber : '0000000',
            neighborhood: neighborhood,
            phoneNumber: phoneNumber,
            state: state,
            valid: valid,
            zipCode: zipCode
        }
    }

    /**
     *
     * @param address1
     * @param address2
     * @param cellphone
     * @param city
     * @param contactName
     * @param corporateName
     * @param customerNumber
     * @param neighborhood
     * @param phoneNumber
     * @param state
     * @param valid
     * @param zipCode
     * @returns {{corporateName: string, valid: boolean, zipCode: string, phoneNumber: string, address2: string, city: string, address1: string, contactName: string, cellphone: string, neighborhood: string, state: string, customerNumber: string}}
     */
    destinationInfo(address1 = '', address2 = '', cellphone = '', city = '',
                    contactName = '', corporateName = '', customerNumber = '0000000',
                    neighborhood = '', phoneNumber = '', state = '', valid = true,
                    zipCode = '') {
        return {
            address1: address1,
            address2: address2 ? address2 : address1,
            cellphone: cellphone,
            city: city,
            contactName: contactName,
            corporateName: corporateName ? corporateName : contactName,
            customerNumber: customerNumber ? customerNumber : '0000000',
            neighborhood: neighborhood,
            phoneNumber: phoneNumber,
            state: state,
            valid: valid,
            zipCode: zipCode
        }
    }

    /**
     *
     * @returns {Promise<void|T|T>}
     */
    async getLabel() {
        let result;
        let data = {
            originInfo: this.originInfo(),
            destinationInfo: this.destinationInfo(),
            login: this.login,
            password: this.password,
            suscriberId: this.suscriberId,
            serviceTypeId: this.serviceTypeId,
            serviceTypeIdDocRet: this.serviceTypeIdDocRet,
            officeNum: this.officeNum,
            numberOfLabels: this.numberOfLabels,
            returnDocument: this.returnDocument,
            weigh: this.weight,
            content: this.content,
            paperType: this.paperType,
            valid: this.valid,
            contentDescription: this.contentDescription,
            costCenter: this.costCenter,
            customerNumber: this.customerNumber,
            deliveryToEstafetaOffice: this.deliveryToEstafetaOffice,
            destinationCountryId: this.destinationCountryId,
            quadrant: this.quadrant,
            originZipCodeForRouting: this.originZipCodeForRouting,
        };

        try {
            result = await soap.createClientAsync(url)
                .then((client) => {
                    return client.createLabelAsync(data);
                });
        } catch (e) {
            console.error(e);
        }
        return result;
    };
}

export {Estafeta};