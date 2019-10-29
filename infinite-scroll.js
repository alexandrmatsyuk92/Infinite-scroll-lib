const InfiniteScroll = (() => {
    //"pseudo-private" fields declaration
    var _container = null,
        _data = null,
        _perPage = null,
        _renderFunc = null,
        _page = 0;

    //constructor
    function InfiniteScroll (containerId, data, perPage, renderFunc) {
        _container  = document.getElementById(containerId);
        _data = data;
        _perPage = perPage;
        _renderFunc = renderFunc;

        handlePageRender();
        addScrollListener();
    }

    //add scroll listener to container
    function addScrollListener() {
        _container.addEventListener('scroll', scrollCallback);
    }

    //callback for scroll event listener
    function scrollCallback() {
        if (_container.scrollTop + _container.clientHeight >= _container.scrollHeight) {
            _page++;
            handlePageRender();
           checkLastPage();
        }
    }

    //render new items to infinite scroll container
    function handlePageRender() {
        const pageData = getPageData();
        _container.innerHTML += _renderFunc(pageData);
    }

    //get data for next page
    function getPageData() {
       return _data.slice(_page * _perPage, (_page + 1) * _perPage); 
    }

    //check if we already on the latest page
    function checkLastPage() {
        if (_perPage * (_page + 1) >= _data.length) {
            removeScrollListener(); 
        }
    }

    //remove listener after we reach the end of array
    function removeScrollListener() {
        _container.removeEventListener('scroll', scrollCallback);
    }

    return InfiniteScroll;
})();
