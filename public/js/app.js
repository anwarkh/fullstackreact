class ProductList extends React.Component {

    state = {
        products: [],
    };

    componentDidMount() {
        this.setState({ products: Seed.products });
    }
    handleProductUpVote = (product) => {
        const nextProducts = this.state.products.map(value => {
            if(product.id ===value.id){
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            }
            return value;
        });
        this.setState({products : nextProducts});
    };

    render() {
       const productComponents = this.state.products
                                           .sort((a,b)=> { return b.votes - a.votes})
                                           .map(p => <Product key={'product-' + p.id} product={p} upVote={this.handleProductUpVote}/>);


        return (
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        );
    }


}

class Product extends React.Component {


    handleUpVote = ()=>  this.props.upVote(this.props.product);


    render() {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.product.productImageUrl}/>
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='large caret up icon' />
                        </a>
                        {this.props.product.votes}
                    </div>
                    <div className='description'>
                        <a href={this.props.product.url}>{this.props.product.title}</a>
                        <p>{this.props.product.description}</p>
                    </div>
                    <div className='extra'>
                        <span>Submitted by:</span>
                        <img
                            className='ui avatar image'
                            src={this.props.product.submitterAvatarUrl}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <ProductList/>,
    document.getElementById('content')
);