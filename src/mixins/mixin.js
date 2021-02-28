import swal from 'sweetalert2'

export default {
    methods: {
        /**
         * setRoute functionality
         */
        setRouteQuery() {
            const urlPath = this.$route.path
            const queryString = this.$route.query
            var olderRouteList = this.$router.olderRouteList
            var currentRouteListIndex = olderRouteList.findIndex((element, index) => {
                return element.path == urlPath
            })
            olderRouteList[currentRouteListIndex].query = queryString
            this.$router.olderRouteList = olderRouteList
        },
        async takeConfirmation(title = "Are you sure?", bodyText = "You won't be able to revert this!", 
                        confirmText = "Yes, Do it!", icon = "warning") {
            let confirmation = false
            await swal.fire({
                title: title,
                text: bodyText,
                icon: icon,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: confirmText,
            }).then((result) => {
                if(result.value){
                    confirmation = true
                } 
            })
            return confirmation
        },
    }
}
