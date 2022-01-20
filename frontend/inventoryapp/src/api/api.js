export const getAllInventoryItems = () => {
    const items = fetch("http://localhost:5000/inventoryitems").then(res => res.json());
    return items;
};

export const createInventoryItem = (itemData) => {
    const createItemRequest = fetch("http://localhost:5000/inventoryitem",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(itemData)
        }
    );
    return createItemRequest;
};

export const getInventoryItemById = (id) => {
    const item = fetch("http://localhost:5000/inventoryitem/" + id).then(res => res.json());
    return item;
};

export const updateInventoryItemById = (id, itemData) => {
    const createItemUpdateRequest = fetch("http://localhost:5000/update/inventoryitem/" + id,
        {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(itemData)
        }
    );
    return createItemUpdateRequest;
};

export const deleteInventoryItemById = (id) => {
    const deleteItemRequest = fetch("http://localhost:5000/inventoryitem/delete/" + id,
        {
            method: "Delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "Application/json"
            },
        }
    );
    return deleteItemRequest;
};

export const deleteInventoryItems = (data) => {
    const deleteItemsRequest = fetch("http://localhost:5000/delete",
        {
            method: "Delete",
            headers: {
                "Accept": "application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({deleteids: data})
        }
    );
    return deleteItemsRequest;
};

export const createExportCSV = (data) => {
    const csvExportRequest = fetch("http://localhost:5000/exportcsv",
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({exportids: data})
        }
    );
    return csvExportRequest;
};