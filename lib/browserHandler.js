const setBrowser = async (browser) => {
    this._browser = browser;
};

const overridePermissions = async (origin, permissions) => {
    const permissionToProcotol = new Map([
        ['geolocation', 'geolocation'],
        ['midi', 'midi'],
        ['notifications', 'notifications'],
        ['push', 'push'],
        ['camera', 'videoCapture'],
        ['microphone', 'audioCapture'],
        ['background-sync', 'backgroundSync'],
        ['ambient-light-sensor', 'sensors'],
        ['accelerometer', 'sensors'],
        ['gyroscope', 'sensors'],
        ['magnetometer', 'sensors'],
        ['accessibility-events', 'accessibilityEvents'],
        ['clipboard-read', 'clipboardRead'],
        ['clipboard-write', 'clipboardWrite'],
        ['payment-handler', 'paymentHandler'],
        ['midi-sysex', 'midiSysex'],
    ]);
    permissions = permissions.map(permission => {
        const protocolPermission = permissionToProcotol.get(permission);
        if (!protocolPermission)
            throw new Error('Unknown permission: ' + permission);
        return protocolPermission;
    });
    this._browser.grantPermissions({origin, permissions});
};

const clearPermissionOverrides = async () => {
    await this._browser.resetPermissions();
};

module.exports = { setBrowser, clearPermissionOverrides, overridePermissions };