
var StockList = React.createClass({
    getInitialState: function(){
        var symbolsInput = this.props.stocks;
        var stocks = [];
        symbolsInput.forEach(function(symbol){
           stocks.push(new Stock(symbol)) ;
        });
        return {stocks:stocks, units:'%', timeframe: 'week'};
    },
    componentDidMount: function(){
        this.update();
    },
    inputSymbol: function(event){
        this.setState({newSymbol: event.target.value});
    },
    addNewSymbol: function(){
        var duplicate = false;
        var newSymbol = this.state.newSymbol;
        this.state.stocks.forEach(function(stock){ //check for duplicates
            if(stock.symbol === newSymbol){
                duplicate = true;
                return;
            }
        });
        if(!duplicate){ //add symbol to array, clear input field, rerender
            var newStock = new Stock(this.state.newSymbol);
            getStockData(newStock, function(){
                this.setState({stocks: this.state.stocks.concat([newStock])})
                this.chartDates();
                $('#stockInput').val('');
            }.bind(this));
        }
    },
    update: function(){
        this.state.stocks.forEach(function(stock, index){
            getStockData(stock, function(){
                this.setState({});
                this.chartDates();
            }.bind(this));
        }.bind(this));
    },
    chartDates: function(){
        var dates = getChartDates(this.state.timeframe);
        var units = this.state.units;
        
        var dataSeries = [];
        this.state.stocks.forEach(function(stock, index){
            var priceArray = getDataForChart(units,dates,stock);
            var className = 'line-' + index;
            dataSeries.push({name: stock.symbol, className:className, data:priceArray});
        });
        dates.forEach(function(date, index){
            dates[index] = moment(date).format('MMM Do');
        })
        makeChart(dates, dataSeries);
        this.setState({});
    },
    changeUnits: function(event){
        this.setState({units: event.target.value},function(){
            this.chartDates();
        });
    },
    changeTimeframe: function(event){
        this.setState({timeframe: event.target.value},function(){
            this.chartDates();
        });
    },
    handleRemoveStock: function(index){
        var newStocks = this.state.stocks;
        newStocks.splice(index,1);
        this.setState({stocks: newStocks}, function(){
            this.chartDates();
        });  
    },
    render: function(){
        var stocks = this.state.stocks;
        return (
            <div>
                <div className='form-inline'>
                    <input id='stockInput' className='form-control' onChange={this.inputSymbol} placeholder='Add symbol...'/>
                    <button onClick={this.addNewSymbol} className='btn btn-success'>Add</button>
                    <button onClick={this.update} id='updateButton' className='btn btn-default'>Update</button>
                    <select id='display-units' onChange={this.changeUnits} className='form-control'>
                        <option>%</option>
                        <option>$</option>
                    </select>
                    <select id='display-timeframe' onChange={this.changeTimeframe} className='form-control'>
                        <option value='week'>Past Week</option>
                        <option value='month'>Past Month</option>
                        <option value='year'>Past Year</option>
                    </select>
                </div>
                <div className='row'>
                    {stocks.map(function(stock, index){
                        return <StockBox stock={stock} key={stock.symbol} index={index} handleRemoveStock={this.handleRemoveStock}/>
                    }.bind(this))}
                </div>
            </div>
        );
    }
})

var StockBox = React.createClass({
    handleRemoveStock: function(){
        this.props.handleRemoveStock(this.props.index);
        return false;
    },
    render: function(){
        var stock = this.props.stock;
        {if(stock.data.length > 0) {
            var lastPriceTime = moment(stock.data[0][0]).format('MMM Do');
            var boxStyle = {borderColor: stock.colorCode};
            var classList = "stockBox stock-" + this.props.index;
            return (
                <div className='col-sm-6' >
                    <div className={classList} style={boxStyle}>
                        <span type="button"  className="glyphicon glyphicon-remove" onClick={this.handleRemoveStock}></span>
                        <h1>{stock.symbol}</h1>
                        <h5>{stock.name}</h5>
                        <p>Last closed {lastPriceTime} at ${stock.data[0][4]}</p> 
                    </div>
                </div>
                )
        } else {
            return (<div></div>)
        }}
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<StockList stocks={["MSFT","AAPL"]} />, destination);