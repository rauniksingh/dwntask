const __ = require('../../util/response')
const stateQuery = require('../../DataAdaptor/Mongo/Query/state')
const distQuery = require('../../DataAdaptor/Mongo/Query/district')

class District {

    async _CreateDistrict (req, res) {
        
        try {
            let checkState = await stateQuery.checkState(req.body.stateId);
            if (!checkState) return __.customMsg(req, res, 404, 'State not exists');
            
            let checkDistrict = await distQuery.checkDupDistrict(req.body); 
            if (checkDistrict) return __.customMsg(req, res, 400, 'District already exists');

            req.body.createdBy = req.userId
            await distQuery.createDistrict(req.body);

            __.successMsg(req, res, 201, undefined, 'Districted created')

        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_CreateDistrict')  
        };

    };

    async _GetDistrict (req, res) {
        try {

            if(!req.query.limit){ req.query.limit = 100 };
            
            req.query.limit = parseInt(req.query.limit)
            
            if( !req.query.page ) { req.query.page = 1 };
            
            if(req.query.page){
                req.query.page = parseInt(req.query.page)
                req.query.page =  req.query.page - 1
            };
            
            let skipRec = req.query.page * req.query.limit;

            let districts = await distQuery.fetchDistrict(req.query.stateId, skipRec, req.query.limit);

            __.successMsg(req, res, 200, districts, 'District list')

        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_GetDistrict')  
        };

    };

};

module.exports = new District()