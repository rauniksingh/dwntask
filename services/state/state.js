const __ = require('../../util/response');
const StateQuery = require('../../DataAdaptor/Mongo/Query/state')

class State {

    async _CreateState (req, res) {
        try {

            let stateCount = await StateQuery.getStateName(req.body.stateName);
            if (stateCount) return __.customMsg(req, res, 400, `State name ${req.body.stateName} already exists `)
            
            req.body.createdBy = req.userId;
            await StateQuery.createState(req.body);

            __.successMsg(req, res, 201, undefined, 'Operation performed successfully')
            
        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_CreateState')  
        };
    };

    async _GetStates (req, res) {
        try {

            if(!req.query.limit){ req.query.limit = 100 };
            
            req.query.limit = parseInt(req.query.limit)
            
            if( !req.query.page ) { req.query.page = 1 };
            
            if(req.query.page){
                req.query.page = parseInt(req.query.page)
                req.query.page =  req.query.page - 1
            };
            
            let skipRec = req.query.page * req.query.limit;

            let states = await StateQuery.fetchStates(skipRec, req.query.limit);

            __.successMsg(req, res, 200, states, 'state list')

        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_GetStates');  
        };
    };

};

module.exports = new State();