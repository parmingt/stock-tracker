
var Stock = React.createClass({
    getInitialState: function(){
        var symbol = this.props.symbol;
        getQuote(symbol);
        return {value:symbol};
    },
    render: function(){
        var name="Stocks"
        return (
            <input value={this.state.value} />
        );
    }
})

var destination = document.querySelector("#container");

ReactDOM.render(<Stock symbol="AAPL" />, destination);