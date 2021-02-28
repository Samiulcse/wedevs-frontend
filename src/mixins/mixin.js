import swal from 'sweetalert2'

export default {
    methods: {
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
