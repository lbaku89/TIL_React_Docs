import "./App.css";
import { useState, useEffect } from "react";

function FilterableProductTable(props) {
    const [filterText, setFilterText] = useState("");
    const [inStockOnly, setInStockOnly] = useState(false);

    const onFilterTextChange = (text) => {
        setFilterText(text);
    };

    const onInStockOnly = (isChecked) => {
        setInStockOnly(isChecked);
    };

    return (
        <>
            <h3>typed word:{filterText}</h3>
            <h3>inStockOnly?:{inStockOnly}</h3>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={onFilterTextChange} onInStockOnly={onInStockOnly} />
            <ProductTable product={props.product} filterText={filterText} onStockOnly={inStockOnly} />
        </>
    );
}

function SearchBar(props) {
    return (
        <>
            <input
                type="text"
                placeHolder="Search"
                onChange={(e) => {
                    console.log("e.target.value=>", e.target.value);
                    props.onFilterTextChange(e.target.value);
                }}
            ></input>
            <br></br>
            <input
                type="checkbox"
                onChange={(e) => {
                    props.onInStockOnly(e.target.checked);
                }}
            ></input>
            <span>Only show products in stock</span>
        </>
    );
}

function ProductTable(props) {
    const [renderData, setRenderData] = useState([]);

    useEffect(() => {
        const data = [];
        let lastCategory = null;
        console.log("props", props);
        props.product.forEach((product) => {
            if (product.name.indexOf(String(props.filterText)) === -1) {
                return;
            } else {
                if(props.onStockOnly&&!product.stocked){
                    return ;
                }else{
                    if (lastCategory !== product.category) {
                        data.push(<ProductCategoryRow category={product.category} />);
                        lastCategory = product.category;
                    }
                    data.push(<ProductRow product={product} />);                    
                }
            }
        });
        setRenderData(data);
    }, [props.filterText, props.onStockOnly]);

    return (
        <>
            <div>
                {renderData.map((item) => {
                    return item;
                })}
            </div>
        </>
    );
}

function ProductCategoryRow(props) {
    return (
        <>
            <p style={{ color: "red" }}>{props.category}</p>
        </>
    );
}

function ProductRow(props) {
    return (
        <>
            <p>
                {props.product.name} {props.product.price}
            </p>
        </>
    );
}

function App() {
    const PRODUCT = [
        { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
        { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
        { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
        { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
        { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
        { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
    ];

    return (
        <>
            <FilterableProductTable product={PRODUCT} />
        </>
    );
}

export default App;
