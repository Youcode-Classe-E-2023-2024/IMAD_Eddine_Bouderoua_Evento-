export function getCookie(name) {
    return new Promise(async (resolve, reject) => {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');

        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i].trim();
            if (cookie.indexOf(cookieName) === 0) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/Checkwho', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': cookie.substring(cookieName.length, cookie.length),
                        },
                    });

                    const data = await response.json();

                    if (data.role === 'user') {
                        resolve('user');
                    } else {
                        resolve('organizer');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    reject(false);
                }
            }
        }

        console.log('wsl');
        resolve(false);
    });
}