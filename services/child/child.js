const __ = require('../../util/response');
const childQuery = require('../../DataAdaptor/Mongo/Query/child')

class Child {

    async _CreateChild (req, res) {
        try {
            
            req.body.createdBy = req.userId;

            await childQuery.addChild(req.body);

            __.successMsg(req, res, 201, undefined, 'Child added !')

            
        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_CreateChild')  
        };
    };

    async _GetChild (req, res) {
        try {

            if(!req.query.limit){ req.query.limit = 100 };
            
            req.query.limit = parseInt(req.query.limit)
            
            if( !req.query.page ) { req.query.page = 1 };
            
            if(req.query.page){
                req.query.page = parseInt(req.query.page)
                req.query.page =  req.query.page - 1
            };
            
            let skipRec = req.query.page * req.query.limit;

            let children = await childQuery.fetchChild(skipRec, req.query.limit);
            children = await children.map((v,i)=>{
                v.districtName = v.districtId.districtName,
                v.stateName = v.stateId.stateName
                delete v.districtId
                delete v.stateId
                return v;
            })
            __.successMsg(req, res, 200, children, 'District list')

        } catch (error) {
           __.errorMsg(req, res, 500, 'Internal server error', error, '_GetChild')   
        };
    };

    async _GetChildDetail (req, res) {
        try {
           
            let child = await childQuery.getChildById(req.params.childId);

            child.districtName = child.districtId.districtName,
            child.stateName = child.stateId.stateName
            delete child.districtId
            delete child.stateId
            
            __.successMsg(req, res, 200, child, 'Child info');

        } catch (error) {
          __.errorMsg(req, res, 500, 'Internal server error', error, '_GetChildDetail')  
        };
    };

};

module.exports = new Child();