$('#tblService').bootstrapTable({

            url: 'getData.asmx/getCustomers',
            method: 'get',                
            queryParams: function (params) {
                q = {
                    limit: 50, //params.pageSize,
                    offset: 2, //params.offset,
                    search: "'" + params.search + "'",
                    sort: "'" + params.sort + "'",
                    order: "'" + params.order + "'"
                }
                return q;
            },
            cache: false,
            height: 400,
            striped: true,
            pagination: true,
            sidePagination: 'server',
            pageSize: 10,
            pageList: [10, 25, 50, 100, 200],
            search: true,
            showColumns: true,
            showRefresh: true,
            minimumCountColumns: 2,
            clickToSelect: false,
            columns: [
            {
                field: 'Debnr',
                title: 'Debiteur #',
                sortable: true,
                width: 100
            },
            {
                field: 'Naam',
                title: 'Naam',
                sortable: true,
                width: 200
            },
            {
                field: 'Adres',
                title: 'Adres',
                sortable: true
            }
            ]
        });

