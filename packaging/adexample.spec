Name:           adexample
BuildArch:      noarch
BuildRequires:  nodejs >= 0.10.0
Requires:	open-xchange-appsuite
Version:        0.0.0
%define         ox_release 1
Release:        1
# use next line to run on a OBS instance
#Release:        %{ox_release}_<CI_CNT>.<B_CNT>
Group:          Applications/Productivity
Vendor:         Open-Xchange
URL:            http://www.open-xchange.com
Packager:       Julian Bäume <julian.baeume@open-xchange.com>
License:        MIT
Summary:        Example configuration for advertisment integration
Source:         %{name}_%{version}.orig.tar.gz
# use the next line to run build with bz2 compressed sources
#Source:         %{name}_%{version}.orig.tar.bz2
BuildRoot:      %{_tmppath}/%{name}-%{version}-root

%if 0%{?suse_version}
Requires:       apache2
%endif
%if 0%{?fedora_version} || 0%{?rhel_version}
Requires:       httpd
%endif

%if 0%{?rhel_version} || 0%{?fedora_version}
%define docroot /var/www/html/
%else
%define docroot /srv/www/htdocs/
%endif

%description
Example configuration for advertisment integration

%package static
Group:          Applications/Productivity
Summary:	Static files for adexample

%description static
Example configuration for advertisment integration

This package contains static files to be installed on the web-server


%prep

%setup -q

%build

node -e "require('grunt').cli()" "" dist --no-color

%install
export NO_BRP_CHECK_BYTECODE_VERSION=true
APPSUITE=/opt/open-xchange/appsuite/
node -e "require('grunt').cli()" "" install:dist --prefix %{buildroot}/opt/open-xchange --htdoc %{buildroot}%{docroot} --no-color
find "%{buildroot}$APPSUITE" -type d | sed -e 's,%{buildroot},%dir ,' > %{name}.files
find "%{buildroot}$APPSUITE" \( -type f -o -type l \) | sed -e 's,%{buildroot},,' >> %{name}.files

find "%{buildroot}%{docroot}/appsuite" -type d | sed -e 's,%{buildroot},%dir ,' > %{name}-static.files
find "%{buildroot}%{docroot}/appsuite" \( -type f -o -type l \) | sed -e 's,%{buildroot},,' >> %{name}-static.files

%clean
%{__rm} -rf %{buildroot}

%define update /opt/open-xchange/appsuite/share/update-themes.sh

%post
if [ $1 -eq 1 -a -x %{update} ]; then %{update} --later; fi

%postun
if [ -x %{update} ]; then %{update} --later; fi


%define touch /opt/open-xchange/sbin/touch-appsuite

%post static
if [ -x %{touch} ]; then %{touch}; fi


%files -f %{name}.files
%defattr(-,root,root)
%dir /opt/open-xchange
%exclude %{docroot}/*

%files static -f %{name}-static.files
%defattr(-,root,root)

