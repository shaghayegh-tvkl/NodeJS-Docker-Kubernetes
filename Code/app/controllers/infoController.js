module.exports = new class serviceController {
    constructor() {
        this.models = {
            Service: require(`${config.path.model}/infoData`)
        }
    }

    async addInformation(req, res) {
        await this.models.Service.addInformation(req.body).then(response => {
            return res.status(200).json({
                success: true,
                msg: response
            })
        }).catch(error => {
            return res.status(405).json({
                success: false,
                msg: error
            })
        })

    }

    async getInformation(req, res) {
        await this.models.Service.getInformation().then((Information) => {
            res.json({ Information })
        }).catch(error => {
            return res.status(405).json({
                success: false,
                msg: error
            })
        })
    }


}
