class LocalStorageService {
    
    static adicionarItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static removerItem(key) {
        localStorage.removeItem(key);
    }

    static obterItem(key) {
        const item = localStorage.getItem(key);
        return JSON.parse(item);
    }
}

export default LocalStorageService;