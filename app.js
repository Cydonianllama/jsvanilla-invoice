class EntityRepository {
    constructor(repository = []){
        this.repo = repository
    }
    findOne(id){
        let report = this.repo.find(object => object.id === id)
        return report
    }
    findPage(page){
        const limit = 30 
        let report = this.repo.slice(page,page*limit)
        console.log(report)
        return report
    }
    findAll(){
        let report = this.repo
        return report
    }
    create(object){
        this.repo.push(object)
    }
    delete(id){
        let newArr = this.repo.filter(object => object.id !== id)
        this.repo = newArr
        return id
    }
    update(object){
        let newArr = this.repo.map(data => {
            if (object.id === data.id ){
                return object
            }else{
                return data
            }
        })
        this.repo = newArr
    }
}

const billSellRepository = new EntityRepository(Billsells)

class BillSellService{
    
    constructor(){

    }

    getBillsByPage(page){
        let report = billSellRepository.findAll()
        return report
    }

    getBill(id){
        let report = billSellRepository.findOne(id)
        return report
    }
    
    generateBill(object){
        billSellRepository.create(object)
    }

    updateBill(object){

    }

    saveBill(object){

    }

    exportBill(){

    }

}

const billSellService = new BillSellService()

//BUSINES MODEL ACTIONS
function genetateSellViewCode(){
    let code_1 = 'SELL-';
    let code_2 = () => Math.floor(Math.random()*1000).toString()+'-';
    let code_3 = () => Math.floor(Math.random()*1000000).toString()
    return code_1 + code_2() + code_3()
}

//view names
const VIEW_DASHBOARD_BILLS = 'VIEW_DASHBOARD_BILLS'
const VIEW_BILL_SELL_VIEW = 'VIEW_BILL_SELL_VIEW'
const VIEW_BILL_SELL_GENERATION = 'VIEW_BILL_SELL_GENERATION'

const viewHandler = {
    backInit(rootContainer){
        const dashboardComponent = new dashboardBillsSellUI()
        rootContainer.innerHTML = ''
        dashboardComponent.render(rootContainer)
    },
    changeView(viewName){
        const rootContainer = document.getElementById('root')
        switch(viewName){
            case VIEW_DASHBOARD_BILLS:
                return
            case VIEW_BILL_SELL_VIEW:
                const billSellViewUI = new BillSellViewUI()
                rootContainer.innerHTML=''
                billSellViewUI.render(rootContainer)
                return
            case VIEW_BILL_SELL_GENERATION:
                const billSellCreationUI = new BillSellCreationUI()
                rootContainer.innerHTML = ''
                billSellCreationUI.render(rootContainer)
                return
        }
    },
}

//contexts
const CONTEXT_DASHBOARD = 'CONTEXT_DASHBOARD'
const CONTEXT_BILL_VIEW = 'CONTEXT_BILL_VIEW'
const CONTEXT_BILL_GENERATION = 'CONTEXT_BILL_GENERATION'
const CONTEXT_SHARED_ACTIONS = 'CONTEXT_SHARED_ACTIONS'

const dashobardContext = {
    populateRows(page,callback){
        let report = billSellService.getBillsByPage(page)
        callback(report)
    },
    deliverToBillSellView(idBill){

    },
    deliverToGenenerateBillSellView(){

    },
}

const billViewContext = {
    updateInformation(object){

    },
}

const billGenerationContext = {
    generateSellBill(){

    },
    saveSellBill(){

    },
    cancelSellBill(callback){
        callback();
    },
}

const sharedActionsContext = {
    exportSellBill(idBill,format){

    },
}

const contextState = (type) => {
    switch(type){
        case CONTEXT_DASHBOARD:
            return dashobardContext
        case CONTEXT_BILL_VIEW:
            return billViewContext
        case CONTEXT_BILL_GENERATION:
            return billGenerationContext
        case CONTEXT_SHARED_ACTIONS:
            return sharedActionsContext
    }
}

class BillSellProductItem{
    constructor(){

    }
    listeners(){

    }
    getTemplate(){
        let div = document.createElement('tr')
        div.classList.add('tr-sell-product-item')
        let template = `
	        	<td>Eliminated</td>
	        	<td>Erick Grandez</td>
	        	<td>Architect</td>
	        	<td>29</td>
	        	<td>29</td>
        `
        div.innerHTML = template
        return div
    }
    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners() 
    }
}

class BillSellProducts{
    constructor() {

    }
    listeners() {

    }
    getTemplate() {
        let div = document.createElement('table')
        let template = `	
	        <thead>
	        	<tr>
	        		<th>code</th>
	        		<th>quantity</th>
	        		<th>description</th>
	        		<th>unitary price</th>
                    <th>ammount</th>
	        	</tr>
	        </thead>
	        <tbody id = "list-products">
	        	
	        </tbody>        
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class ActionsbillSell{
    constructor() {

    }
    listeners() {
        const btnGenerate = document.getElementById('btn-generate-bill-sell')
        btnGenerate.addEventListener('click',()=>{

        })
        const btnSave = document.getElementById('btn-save-bill-sell')
        btnSave.addEventListener('click',()=>{

        })
        const btnCancel = document.getElementById('btn-cancel-bill-sell')
        btnCancel.addEventListener('click',()=>{

        })
    }
    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('actions-bill-sell')
        let template = `
            <button type = "button" id = "btn-cancel-bill-sell" >
                cancel
            </button>
            
            <button type = "button" id = "btn-save-bill-sell" >
                save
            </button>

            <button type ="button" id = "btn-generate-bill-sell">
                generate
            </button>
            
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class BillSellCreationUI {
    constructor() {

    }
    listeners() {
        const btnBack1 = document.getElementById('btn-back-1')
        btnBack1.addEventListener('click',()=>{
            const containerRoot = document.getElementById('root')
            viewHandler.backInit(containerRoot)
        })
    }
    getTemplate() {
        let div = document.createElement('div')
        let template = `

        <button type = "button" id = "btn-back-1">
            back
        </button>

            <form class = "bill-sell-form">
                <div class = "bill-sell-header">

                    <div class="bill-sell-static-information">
                        <div class = "row-container">
                            <img class="static-info-logo"
                                src="https://c0.klipartz.com/pngpicture/388/797/gratis-png-red-portatil-de-iconos-de-la-computadora-iconos-logo-whatsapp.png"
                                alt="enterprise logo">
                            <h3 class="static-info-enterprise-name">
                                Empresa Grabdez
                            </h3>
                        </div>
                        
                        <small class = "static-info-RUC">
                            5456415451154
                        </small>
                        <small class="static-info-direction">
                            direction of this enterprise
                        </small>
                    </div>

                    <div class = "bill-sell-metadata">

                        <h3 class = "bill-sell-metadata-concept">
                            Bill
                        </h3>
                        <span class = "bill-sell-metadata-code">
                            
                        </span>

                    </div>

                </div>

                <div class = "bill-sell-buyer-information">

                    <label for="fullname-buyer">Fullname</label>
                    <input name= "fullname-buyer"type="text" placeholder = "fullname buyer">
                    <label for="direction-buyer">Direction</label>
                    <input name = "direction-buyer" type="text" placeholder = "direction buyer">
                    <label for="document-code">Document Code</label>
                    <input name="document-code"type="text" placeholder = "Document">

                </div>

                <div id = "bill-sell-lists-products">

                   
                </div>
                <div>
                    <button type = "button">
                        add product
                    </button>
                </div>

                <div id = "bill-sell-actions">

                </div>

            </form>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)

        const codeBillDOM = document.querySelector('.bill-sell-metadata-code')
        codeBillDOM.innerText = 'code - 001 - 54564654'

        const containerActions = document.getElementById('bill-sell-actions')
        const containerlistProducts = document.getElementById('bill-sell-lists-products')
        //render components inside
        let actionsBellComponent = new ActionsbillSell()
        let billSellProducts = new BillSellProducts()
        actionsBellComponent.render(containerActions)
        billSellProducts.render(containerlistProducts)

        this.listeners()
    }
}

/////////////////////////////////

class ActionsDashboardBillsSell{
    constructor() {

    }
    listeners() {
        const btnGenerate = document.getElementById('btn-generate-actions-dashbord')
        btnGenerate.addEventListener('click',()=>{
            viewHandler.changeView(VIEW_BILL_SELL_GENERATION)
        })
    }
    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('actions-dashboard-bills-sell')
        let template = `
            <button type = "button" id = "btn-generate-actions-dashbord">
                generate
            </button>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class BillSellRow {
    constructor() {

    }
    listeners() {
        const component = this.currentComponent
        component.addEventListener('click',()=>{
            viewHandler.changeView(VIEW_BILL_SELL_VIEW)
        })
    }
    getTemplate() {
        let tr = document.createElement('tr')
        tr.classList.add('bill-sell-row')
        let template = `
            <td class = "row-bill-code"></td>
	        <td class = "row-emission-date" ></td>
	        <td class = "row-document-type" ></td>
	        <td class = "row-document-code" ></td>
	        <td class = "row-total-import" ></td>
        `
        tr.innerHTML = template
        this.currentComponent = tr
        return tr
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)

        const rowBillCode = this.currentComponent.querySelector('.row-bill-code')
        const rowEmissionDate = this.currentComponent.querySelector('.row-emission-date')
        const rowDocumentType = this.currentComponent.querySelector('.row-document-type')
        const rowDocumentCode = this.currentComponent.querySelector('.row-document-code')
        const rowTotalImport = this.currentComponent.querySelector('.row-total-import')

        const {
            codeBill,
            dateOfemission,
            documentIdentificationTypeID,
            documentIdentification,
            articles
        } = this.data 

        rowBillCode.innerText = codeBill
        rowEmissionDate.innerText = dateOfemission
        rowDocumentType.innerText = documentIdentificationTypeID
        rowDocumentCode.innerText = documentIdentification

        this.listeners()
    }
    setData(data){
        this.data = data
    }
}

class TableBillsSell{
    constructor() {

    }
    listeners() {

    }
    getTemplate() {
        let div = document.createElement('table')
        let template = `
            <thead>
	        	<tr>
	        		<th>bill code</th>
	        		<th>emision date</th>
	        		<th>document type</th>
	        		<th>document code</th>
                    <th>total</th>
	        	</tr>
	        </thead>
	        <tbody class = "list-bills" >

	        </tbody>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)

        const containerTable = document.querySelector('.list-bills')
        console.log(containerTable)
        const tableSellContext = contextState(CONTEXT_DASHBOARD)
        tableSellContext.populateRows(0,(data) => {
            data.forEach( row => {
                let component = new BillSellRow()
                component.setData(row)
                component.render(containerTable)
            })
        })

        this.listeners()
    }
}

class dashboardBillsSellUI{
    constructor() {

    }
    listeners() {

    }
    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('dashboard-bill-sell-ui')
        let template = `
            <div id = "dashboard-bill-sell-actions">
            
            </div>
            <div id = "dashboard-table-bills" >
            
            </div>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        
        const dashboardActionsContainer = document.getElementById('dashboard-bill-sell-actions')
        const dashboardTableBills = document.getElementById('dashboard-table-bills')
        const actions = new ActionsDashboardBillsSell()
        const table = new TableBillsSell()
        actions.render(dashboardActionsContainer)
        table.render(dashboardTableBills)

        this.listeners()
    }
}

//

class BillSellRepresentation{
    constructor() {

    }
    listeners() {

    }
    getTemplate() {
        let div = document.createElement('div')
        let template = `

        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class BillSellViewActions{
    constructor() {

    }
    listeners() {
        const btnCancel = document.getElementById('btn-cancel-bill-sell-view')
        btnCancel.addEventListener('click',()=>{
            viewHandler.backInit(document.getElementById('root'))
        })
    }
    getTemplate() {
        let div = document.createElement('div')
        let template = `
            <button type = "button" id = "btn-cancel-bill-sell-view" >
                cancel
            </button>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }
}

class BillSellViewUI{
    constructor() {

    }
    listeners() {

    }
    getTemplate() {
        let div = document.createElement('div')
        div.classList.add('bill-sell-view-ui')
        let template = `
            bill sell view
            <div id = "view-bill-sell-action">
            </div>
        `
        div.innerHTML = template
        return div
    }
    render(container) {
        let component = this.getTemplate()
        container.append(component)

        const actionsContainer = document.getElementById('view-bill-sell-action')
        const billViewActions = new BillSellViewActions()
        billViewActions.render(actionsContainer)


        this.listeners()
    }
}


const app = () => {
    const root = document.getElementById('root')
    const UI1 = new BillSellCreationUI()
    UI1.render(root)
}

app()
